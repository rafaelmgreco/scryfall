import Image from 'next/image';
import styles from './mana-symbols.module.css';

interface OracleTextProps {
  text: string;
  className?: string;
}

interface ManaCostProps {
  cost: string;
  size?: 'default' | 'large';
  className?: string;
}

function normalizeSymbolAssetName(token: string) {
  const normalized = token.toUpperCase();

  if (normalized === '½') {
    return 'HALF';
  }

  if (normalized === '∞') {
    return 'INFINITY';
  }

  return normalized.replaceAll('/', '');
}

function getSymbolSvgUri(token: string) {
  const assetName = normalizeSymbolAssetName(token);
  return `https://svgs.scryfall.io/card-symbols/${assetName}.svg`;
}

function renderInlineFragments(text: string, size: 'default' | 'large' = 'default') {
  const parts = text.split(/(\{[^}]+\})/g).filter(Boolean);

  return parts.map((part, index) => {
    const tokenMatch = /^\{([^}]+)\}$/.exec(part);

    if (!tokenMatch) {
      return (
        <span className={styles.text} key={`${part}-${index}`}>
          {part}
        </span>
      );
    }

    const token = tokenMatch[1];

    return (
      <Image
        alt={token}
        className={[
          styles.symbolImage,
          size === 'large' ? styles.large : '',
        ]
          .filter(Boolean)
          .join(' ')}
        height={size === 'large' ? 24 : 18}
        key={`${token}-${index}`}
        src={getSymbolSvgUri(token)}
        title={token}
        width={size === 'large' ? 24 : 18}
      />
    );
  });
}

export function OracleText({ text, className = '' }: OracleTextProps) {
  const lines = text.split('\n');

  return (
    <div className={[styles.stack, className].filter(Boolean).join(' ')}>
      {lines.map((line, index) => (
        <p className={styles.line} key={`${line}-${index}`}>
          {renderInlineFragments(line)}
        </p>
      ))}
    </div>
  );
}

export function ManaCost({
  cost,
  size = 'default',
  className = '',
}: ManaCostProps) {
  return (
    <span className={[styles.symbolRow, className].filter(Boolean).join(' ')}>
      {renderInlineFragments(cost, size)}
    </span>
  );
}
