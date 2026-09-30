// GLSL for the procedural space scene: Earth, clouds, atmosphere, Moon, stars, warp streaks.

const noise = /* glsl */ `
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);
    const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;
    vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }
  float fbm(vec3 p){
    float a=0.5; float s=0.0;
    for(int i=0;i<6;i++){ s+=a*snoise(p); p=p*2.03+vec3(1.7,9.2,3.1); a*=0.5; }
    return s;
  }
`

export const sphereVertex = /* glsl */ `
  varying vec3 vObjN;
  varying vec3 vWorldN;
  varying vec3 vWorldP;
  void main(){
    vObjN=normalize(position);
    vWorldN=normalize(mat3(modelMatrix)*normal);
    vec4 wp=modelMatrix*vec4(position,1.0);
    vWorldP=wp.xyz;
    gl_Position=projectionMatrix*viewMatrix*wp;
  }
`

export const earthFragment = /* glsl */ `
  uniform vec3 uSunDir;
  uniform vec3 uCamPos;
  varying vec3 vObjN;
  varying vec3 vWorldN;
  varying vec3 vWorldP;
  ${noise}
  void main(){
    vec3 n=vObjN;
    float warp=fbm(n*2.4);
    float h=fbm(n*1.55+warp*0.35);
    float land=smoothstep(0.06,0.1,h);
    float lat=abs(n.y);
    float detail=fbm(n*9.0);

    vec3 deep=vec3(0.004,0.03,0.09);
    vec3 shallow=vec3(0.02,0.14,0.30);
    vec3 ocean=mix(deep,shallow,smoothstep(-0.25,0.08,h));

    vec3 forest=vec3(0.06,0.14,0.05);
    vec3 steppe=vec3(0.24,0.23,0.12);
    vec3 desert=vec3(0.46,0.38,0.25);
    float arid=smoothstep(0.5,0.9,1.0-abs(lat-0.28)*3.6+detail*0.8);
    vec3 ground=mix(mix(forest,steppe,smoothstep(-0.2,0.3,detail)),desert,arid);
    ground*=0.8+0.4*smoothstep(0.1,0.5,h);

    vec3 col=mix(ocean,ground,land);
    float ice=smoothstep(0.86,0.93,lat+detail*0.06);
    col=mix(col,vec3(0.62,0.68,0.74),ice);

    vec3 L=normalize(uSunDir);
    vec3 N=normalize(vWorldN);
    vec3 V=normalize(uCamPos-vWorldP);
    float ndl=dot(N,L);
    float day=smoothstep(-0.08,0.3,ndl);

    vec3 sun=vec3(1.0,0.96,0.9);
    vec3 lit=col*sun*max(ndl,0.0)*1.1+col*0.01;

    // ocean glint
    vec3 H=normalize(L+V);
    float spec=pow(max(dot(N,H),0.0),70.0)*(1.0-land)*(1.0-ice)*day;
    lit+=sun*spec*0.5;

    // city lights on the night side
    float cities=smoothstep(0.42,0.85,snoise(n*140.0))*smoothstep(-0.05,0.3,fbm(n*5.0+3.0));
    float night=smoothstep(0.05,-0.25,ndl);
    lit+=vec3(1.0,0.62,0.28)*cities*land*(1.0-ice)*night*2.6;

    // warm band along the terminator
    lit+=vec3(1.0,0.4,0.15)*smoothstep(0.18,0.0,abs(ndl))*0.02;

    // inner atmospheric haze
    float fres=pow(1.0-max(dot(N,V),0.0),5.0);
    lit=mix(lit,vec3(0.16,0.42,1.0)*day*0.8,fres*0.45*day);

    gl_FragColor=vec4(lit,1.0);
  }
`

export const cloudFragment = /* glsl */ `
  uniform vec3 uSunDir;
  uniform float uTime;
  varying vec3 vObjN;
  varying vec3 vWorldN;
  varying vec3 vWorldP;
  ${noise}
  void main(){
    vec3 n=vObjN;
    vec3 q=n*2.6+vec3(uTime*0.006,0.0,uTime*0.003);
    float w=fbm(q*1.3);
    float c=fbm(q+w*0.6+vec3(0.0,n.y*2.0,0.0));
    float bands=0.5+0.5*sin(n.y*9.0+w*3.0);
    float a=smoothstep(0.12,0.62,c+bands*0.1)*0.85;
    a*=1.0-smoothstep(0.62,0.92,abs(n.y))*0.75;
    float ndl=dot(normalize(vWorldN),normalize(uSunDir));
    float lit=smoothstep(-0.12,0.35,ndl);
    vec3 col=mix(vec3(0.02,0.03,0.05),vec3(1.0,0.98,0.95),lit);
    col=mix(col,vec3(1.0,0.55,0.3),smoothstep(0.2,0.0,abs(ndl))*0.35*lit);
    gl_FragColor=vec4(col*0.78,a);
  }
`

export const atmosphereVertex = /* glsl */ `
  varying vec3 vWorldN;
  varying vec3 vWorldP;
  void main(){
    vWorldN=normalize(mat3(modelMatrix)*normal);
    vec4 wp=modelMatrix*vec4(position,1.0);
    vWorldP=wp.xyz;
    gl_Position=projectionMatrix*viewMatrix*wp;
  }
`

export const atmosphereFragment = /* glsl */ `
  uniform vec3 uSunDir;
  uniform vec3 uCamPos;
  uniform float uInner; // cos of the angle where the planet limb sits inside the shell
  varying vec3 vWorldN;
  varying vec3 vWorldP;
  void main(){
    vec3 V=normalize(vWorldP-uCamPos);
    vec3 N=normalize(vWorldN);
    float d=abs(dot(N,V));
    float glow=pow(smoothstep(0.0,uInner,d),2.2);
    glow*=1.0-smoothstep(uInner,uInner+0.25,d)*0.6;
    vec3 L=normalize(uSunDir);
    float lit=smoothstep(-0.35,0.45,dot(N,L));
    float forward=pow(max(dot(V,L),0.0),6.0);
    vec3 blue=vec3(0.28,0.58,1.0);
    vec3 dusk=vec3(1.0,0.5,0.22);
    vec3 col=mix(blue,dusk,clamp(forward*1.4,0.0,1.0));
    float k=glow*(lit*0.75+forward*2.4);
    gl_FragColor=vec4(col*k,k);
  }
`

export const moonFragment = /* glsl */ `
  uniform vec3 uSunDir;
  varying vec3 vObjN;
  varying vec3 vWorldN;
  varying vec3 vWorldP;
  ${noise}
  void main(){
    vec3 n=vObjN;
    float maria=smoothstep(0.0,0.3,fbm(n*1.6));
    float craters=1.0-abs(snoise(n*9.0));
    craters=pow(craters,6.0);
    float fine=fbm(n*22.0);
    vec3 col=vec3(0.62,0.6,0.57)*(0.78+fine*0.18);
    col=mix(col,vec3(0.3,0.3,0.31),maria*0.7);
    col+=craters*0.12;
    float ndl=max(dot(normalize(vWorldN),normalize(uSunDir)),0.0);
    gl_FragColor=vec4(col*pow(ndl,0.8)*1.5+col*0.004,1.0);
  }
`

export const starVertex = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aPhase;
  uniform float uTime;
  uniform float uDpr;
  uniform float uFade;
  varying vec3 vColor;
  varying float vAlpha;
  void main(){
    vec4 mv=modelViewMatrix*vec4(position,1.0);
    gl_Position=projectionMatrix*mv;
    float tw=0.72+0.28*sin(uTime*(0.6+aPhase*1.7)+aPhase*40.0);
    gl_PointSize=aSize*uDpr;
    vColor=aColor;
    vAlpha=tw*uFade;
  }
`

export const starFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main(){
    vec2 c=gl_PointCoord-0.5;
    float d=length(c);
    if(d>0.5) discard;
    float core=exp(-d*d*38.0);
    float halo=exp(-d*d*9.0)*0.25;
    gl_FragColor=vec4(vColor*(core+halo),(core+halo)*vAlpha);
  }
`

export const streakVertex = /* glsl */ `
  attribute vec3 aSeed;
  attribute float aEnd;
  uniform float uTravel;
  uniform float uWarp;
  varying float vAlpha;
  void main(){
    vec3 p=vec3(aSeed.xy,mod(aSeed.z+uTravel,190.0)-195.0);
    float tail=aEnd*uWarp*(18.0+aSeed.z*0.08);
    p.z=min(p.z+tail,-1.5);
    gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);
    vAlpha=uWarp*(1.0-aEnd*0.9)*smoothstep(-195.0,-140.0,p.z);
  }
`

export const streakFragment = /* glsl */ `
  varying float vAlpha;
  void main(){
    gl_FragColor=vec4(vec3(0.8,0.88,1.0)*vAlpha,vAlpha);
  }
`
