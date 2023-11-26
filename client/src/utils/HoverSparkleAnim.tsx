import { useEffect, useRef } from "react";
import useMouseEnter from "../components/hooks/useMouseEnter";
import Icon from "./Icon";
import styles from "./styles/HoverSparkleAnim.module.css";

interface PropType {
  children: React.ReactNode;
}

function HoverSparkleAnim({ children }: PropType) {
  const elementRef = useRef<HTMLDivElement>(null); //Keep track of mouse over event
  const [isHovered] = useMouseEnter({ elementRef });

  // Add random values to css variable stored in module.css (styles)
  useEffect(() => {
    if (isHovered) {
      const elements = document.getElementsByClassName(
        styles.sparkle,
      ) as HTMLCollectionOf<HTMLElement>;

      Array.from(elements)?.forEach((element) => {
        const randomAnimationTime =
          (Math.random() * 1.6 + 0.7).toString() + "s";
        const randomScaleMin = (Math.random() * 0.2 + 0.3).toString();
        const randomScaleMax = (
          Math.random() * 1 +
          parseInt(randomScaleMin) +
          0.5
        ).toString();

        element.style.setProperty("--animation-timer", randomAnimationTime);
        element.style.setProperty("--initial-scale", randomScaleMin);
        element.style.setProperty("--final-scale", randomScaleMax);
      });
    }
  }, [isHovered]);

  return (
    <div
      ref={elementRef}
      id="sparkle-animation"
      className={`${styles["sparkle-wrapper"]} relative flex hover:text-sky-500`}
    >
      <div className={`${styles.sparkle} absolute -left-10`}>
        <Icon icon="sparkle" />
      </div>
      <div className={`${styles.sparkle} absolute  -top-12`}>
        <Icon icon="sparkle" />
      </div>
      <div className={`${styles.sparkle} absolute -left-14 -top-14`}>
        <Icon icon="sparkle" />
      </div>

      <div className={`${styles.sparkle} absolute -bottom-0 -left-10`}>
        <Icon icon="sparkle" />
      </div>
      <div className={`${styles.sparkle} absolute -bottom-12`}>
        <Icon icon="sparkle" />
      </div>
      <div className={`${styles.sparkle} absolute -bottom-14 -left-14`}>
        <Icon icon="sparkle" />
      </div>

      <div className={`${styles.sparkle} absolute -right-10`}>
        <Icon icon="sparkle" />
      </div>
      <div className={`${styles.sparkle} absolute -top-12  right-0`}>
        <Icon icon="sparkle" />
      </div>
      <div className={`${styles.sparkle} absolute -right-14 -top-14`}>
        <Icon icon="sparkle" />
      </div>

      <div className={`${styles.sparkle} absolute -right-10 bottom-0`}>
        <Icon icon="sparkle" />
      </div>
      <div className={`${styles.sparkle} absolute -bottom-12 right-0`}>
        <Icon icon="sparkle" />
      </div>
      <div className={`${styles.sparkle} absolute -bottom-14 -right-14`}>
        <Icon icon="sparkle" />
      </div>
      {children}
    </div>
  );
}

export default HoverSparkleAnim;
