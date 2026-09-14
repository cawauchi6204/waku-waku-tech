"use client"

import { Pause, Play, Shuffle } from "lucide-react"
import { useId, useState } from "react"
import { useMotion } from "./MotionProvider"
import styles from "./BauhausStage.module.css"

export default function BauhausStage() {
  const { paused, toggle } = useMotion()
  const [composition, setComposition] = useState(0)
  const titleId = useId()
  const descriptionId = useId()

  return (
    <figure
      className={styles.stage}
      data-composition={composition}
      data-paused={paused}
    >
      <div className={styles.poster}>
        <svg
          className={styles.artwork}
          viewBox="0 0 640 680"
          fill="none"
          role="img"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
        >
          <title id={titleId}>余白と重なりでつくる、動く幾何学ポスター</title>
          <desc id={descriptionId}>
            紙色の上に、大きな酸化赤の円弧、墨色の帯、青灰色の面、黄土色の小さな四角。
            図形がゆっくり交差し、ひとつの構図へ戻ります。
          </desc>

          <g className={styles.ringPlacement}>
            <g className={styles.ringMotion}>
              <path
                d="M436 246A236 236 0 1 1 200 10"
                stroke="#b65f47"
                strokeWidth="112"
              />
            </g>
          </g>

          <g className={styles.bluePlacement}>
            <g className={styles.blueMotion}>
              <path d="M362 461H699V739H362Z" fill="#788991" />
              <path d="M362 461H699V486H362Z" fill="#ebe7dc" fillOpacity=".2" />
            </g>
          </g>

          <g className={styles.bandPlacement}>
            <g className={styles.bandMotion}>
              <path d="M351-83H453V762H351Z" fill="#272b28" />
              <path d="M469-83V762" stroke="#272b28" strokeWidth="1" />
            </g>
          </g>

          <g className={styles.circlePlacement}>
            <g className={styles.circleMotion}>
              <circle
                cx="472"
                cy="352"
                r="116"
                stroke="#272b28"
                strokeWidth="1"
              />
              <circle
                cx="472"
                cy="352"
                r="107"
                stroke="#272b28"
                strokeWidth="1"
              />
            </g>
          </g>

          <g className={styles.ochrePlacement}>
            <g className={styles.ochreMotion}>
              <path d="M512 72H574V134H512Z" fill="#c4ad7f" />
            </g>
          </g>

          <g className={styles.rulePlacement}>
            <g className={styles.ruleMotion} stroke="#272b28" strokeWidth="1">
              <path d="M-25 569H237" />
              <path d="M-25 579H237" />
              <path d="M-25 589H237" />
            </g>
          </g>
        </svg>
      </div>

      <figcaption className={styles.caption}>
        <span className={styles.captionTitle}>
          Form, in motion{" "}
          <span>{String(composition + 1).padStart(2, "0")}</span>
        </span>
        <div className={styles.controls}>
          <button
            className={styles.composeButton}
            type="button"
            onClick={() => setComposition((current) => (current + 1) % 3)}
            aria-label={
              "構図を変える。現在は3種類中" + (composition + 1) + "番目"
            }
          >
            <Shuffle size={13} strokeWidth={1.5} aria-hidden="true" />
            <span>構図を変える</span>
          </button>
          <button
            className={styles.pauseButton}
            type="button"
            onClick={toggle}
            aria-pressed={paused}
            aria-label={paused ? "モーションを再生" : "モーションを一時停止"}
            title={paused ? "モーションを再生" : "モーションを一時停止"}
          >
            {paused ? (
              <Play size={13} strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Pause size={13} strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>
        <span className={styles.srOnly} role="status" aria-live="polite">
          構図 {composition + 1} / 3
        </span>
      </figcaption>
    </figure>
  )
}
