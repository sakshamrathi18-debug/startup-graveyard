import styles from "./PostMortem.module.css";

interface Props {
  text: string;
}

export function PostMortem({ text }: Props) {
  // Split the text by double newlines into paragraphs
  const paragraphs = text.split("\n\n").filter((p) => p.trim() !== "");

  return (
    <article className={styles.article}>
      <h2 className={styles.sectionTitle}>POST-MORTEM ANALYSIS</h2>
      <div className={styles.rule} />
      
      <div className="prose">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={index === 0 ? styles.firstParagraph : ""}>
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
