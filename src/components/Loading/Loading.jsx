import { useEffect, useState } from 'react';
import styles from './Loading.module.css';

const Loading = ({ size, strokeWidth }) => {

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      progress >= 100 ? setProgress(0) : setProgress(progress + 10);
    }, 200);
    return () => clearTimeout(timer);
  }, [progress])

  const radius = (size - strokeWidth) / 2;
  const cirumference = radius * Math.PI * 2;
  const dash = (progress * cirumference) / 100;

  return (
    <div className={styles.loading}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          fill="none"
          stroke="#bbb"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
        />
        <circle
          fill="none"
          stroke="#f78025"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={`${strokeWidth}px`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          strokeDasharray={[dash, cirumference - dash]}
          strokeLinecap="round"
          style={{ transition: "all 0.2s" }}
        />
      </svg>
    </div>
  )
}

export default Loading;
