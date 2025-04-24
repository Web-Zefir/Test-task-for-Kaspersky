import React, { useState } from 'react';
import styles from './NewsCard.module.scss';
import { IData_SnippetNews } from '../data/mockNewsData';
import riaLogo from "../assets/ria-novosti.png"
import {
  FaGlobe,
  FaBookOpen,
  FaRegSquare,
  FaExclamation,
  FaUserAlt,
  FaShieldAlt,
  FaBolt,
  FaKey,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';

interface Props {
  data: IData_SnippetNews;
}

const tagIconMap: Record<string, React.ComponentType<any>> = {
  antivirus: FaShieldAlt,
  kaspersky: FaKey,
  security: FaBolt,
  banking: FaGlobe,
};

const NewsCard: React.FC<Props> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);

  const dateObj = new Date(data.DP);
  const day = dateObj.getDate().toString().padStart(2, '0');
  const monthYear = dateObj.toLocaleDateString('en-GB', {
    month: 'short',
    year: 'numeric',
  });

  const snippet = expanded
    ? data.HIGHLIGHTS.join(' ')
    : data.HIGHLIGHTS[0] + '…';

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.left}>
          <span className={styles.date}>
            <span className={styles.dateDay}>{day}</span>{' '}
            <span className={styles.dateRest}>{monthYear}</span>
          </span>
          <span className={styles.reach}>
            <span className={styles.reachNum}>{data.REACH.toLocaleString()}</span>{' '}
            <span className={styles.reachText}>Reach</span>
          </span>
          <span className={styles.traffic}>
            Top Traffic:{' '}
            {data.TRAFFIC.map((t, i) => (
              <React.Fragment key={i}>
                <span className={styles.country}>{t.value}</span>{' '}
                <span className={styles.percent}>{Math.round(t.count * 100)}%</span>
                {i < data.TRAFFIC.length - 1 && '; '}
              </React.Fragment>
            ))}
          </span>
        </div>
        <div className={styles.sentimentRow}>
          <span className={styles.sentiment}>{data.SENT}</span>
          <FaRegSquare className={styles.sentIcon} />
          <FaExclamation className={styles.sentIcon} />
        </div>
      </div>

      <h2 className={styles.title}>
        <a href={data.URL} target="_blank" rel="noreferrer">
          {data.TI}
        </a>
      </h2>
      <div className={styles.meta}>
        <FaGlobe className={styles.metaIcon} />
        <a href={`https://${data.DOM}`} className={styles.linkDomain}>
          {data.DOM}
        </a>
        <img
          className={styles.flag}
          src={`https://flagcdn.com/w20/${data.CNTR_CODE.toLowerCase()}.png`}
          alt={data.CNTR}
        />
        <span className={styles.countryName}>{data.CNTR}</span>
        <FaBookOpen className={styles.metaIcon} />
        <span className={styles.lang}>En</span>
        <FaUserAlt className={styles.metaIcon} />
        <span className={styles.authors}>{data.AU.join(', ')}</span>
      </div>

      <div className={styles.snippet}>
        <p
          dangerouslySetInnerHTML={{
            __html: snippet
              .replace(/<kw>/g, `<mark class="${styles.mark}">`)
              .replace(/<\/kw>/g, '</mark>'),
          }}
        />
        {data.HIGHLIGHTS.length > 1 && (
          <button
            className={styles.showMore}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show less ▲' : 'Show more ▼'}
          </button>
        )}
      </div>

      <div className={styles.tagsRow}>
        {data.KW.map((t, i) => {
          const Icon = tagIconMap[t.value] || FaRegSquare;
          return (
            <span key={i} className={styles.tag}>
              <Icon className={styles.tagIcon} />
              <span className={styles.tagName}>{t.value}</span>
              <span className={styles.tagCount}>{t.count}</span>
            </span>
          );
        })}
      </div>

      <div className={styles.linksRow}>
        <button
          className={styles.originalBtn}
          onClick={() => window.open(data.URL, '_blank')}
        >
          Original Source
        </button>
        <div className={styles.dupInfo}>
          Duplicates: <span className={styles.dupCount}>{data.DUPLICATES}</span>
        </div>
      </div>

      <div className={styles.dupPreview}>
        <div className={styles.dpHeader}>
          <span className={styles.dpDate}>18 Jun 2024</span>
          <span className={styles.dpReach}>
            211K <span className={styles.dpReachText}>Top Reach</span>
          </span>
          <FaRegSquare className={styles.dpIcon} />
        </div>
        <h3 className={styles.dpTitle}>
          Antivirus leggero: i migliori e più efficaci (free e a pagamento) 2024
        </h3>
        <div className={styles.dpMeta}>
          <img src={riaLogo} className={styles.dpFavicon} alt="favicon" />
          <a href="http://ria.ru" className={styles.dpSourceName}>ria.ru</a>
          <img
            src={`https://flagcdn.com/w20/at.png`}
            className={styles.dpFlag}
            alt="Austria"
          />
          <span className={styles.dpCountry}>Austria</span>
          <FaUserAlt className={styles.dpUserIcon} />
          <span className={styles.dpAuthors}>Emily C., Taormina A.</span>
        </div>
      </div>

      <button
        className={styles.viewAllBtn}
        onClick={() => setViewOpen(prev => !prev)}
      >
        {viewOpen
          ? <FaChevronUp className={styles.viewArrow} />
          : <FaChevronDown className={styles.viewArrow} />
        }
        <span>View Duplicates</span>
      </button>
    </div>
  );
};

export default NewsCard;
