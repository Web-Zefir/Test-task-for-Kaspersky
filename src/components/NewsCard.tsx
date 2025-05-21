import React, { useState, useMemo } from 'react';
import styles from './NewsCard.module.scss';
import { IData_SnippetNews, IData_TagItem } from '../data/mockNewsData'; 
import riaLogo from "../assets/ria-novosti.png";

import { Button, Dropdown, MenuProps, Tooltip, Tag } from 'antd';
import {
  GlobalOutlined,
  UserOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
  LinkOutlined, // Используется для заглушки фавикона
  ExclamationCircleOutlined,
  BorderOutlined,
} from '@ant-design/icons';

interface NewsCardProps {
  data: IData_SnippetNews;
}

const NewsCard: React.FC<NewsCardProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const [duplicatesOpen, setDuplicatesOpen] = useState(false);

  const dateParts = useMemo(() => {
    const dateObj = new Date(data.DP);
    const day = dateObj.getDate().toString();
    const monthYear = dateObj.toLocaleDateString('en-GB', {
      month: 'short',
      year: 'numeric',
    });
    return { day, monthYear };
  }, [data.DP]);

  const formattedReach = useMemo(() => {
    const value = data.REACH;
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)}M`;
    }
    if (value >= 1_000) {
      return `${Math.round(value / 1_000)}K`;
    }
    return value.toString();
  }, [data.REACH]);

  const topTraffic = useMemo(() => {
    const sortedTraffic = [...data.TRAFFIC].sort((a, b) => b.count - a.count).slice(0, 3);
    return sortedTraffic.map((item, index) => (
      <React.Fragment key={index}>
        <span className={styles.trafficCountry}>{item.value}</span>{' '}
        <span className={styles.trafficPercent}>{Math.round(item.count * 100)}%</span>
        {index < sortedTraffic.length - 1 && ' '}
      </React.Fragment>
    ));
  }, [data.TRAFFIC]);

  const snippetContent = useMemo(() => {
    const fullSnippet = data.HIGHLIGHTS.join(' ');
    const SNIPPET_TRUNCATE_LENGTH = 350;
    const isExpandable = fullSnippet.length > SNIPPET_TRUNCATE_LENGTH;

    let displaySnippet = fullSnippet;
    if (!expanded && isExpandable) {
      displaySnippet = fullSnippet.substring(0, SNIPPET_TRUNCATE_LENGTH);
      const lastKwStart = displaySnippet.lastIndexOf('<kw>');
      const lastKwEnd = displaySnippet.lastIndexOf('</kw>');

      if (lastKwStart !== -1 && lastKwEnd < lastKwStart) {
        const nextClosingTagIndex = fullSnippet.indexOf('</kw>', SNIPPET_TRUNCATE_LENGTH);
        if (nextClosingTagIndex !== -1) {
          displaySnippet = fullSnippet.substring(0, nextClosingTagIndex + '</kw>'.length);
        }
      }
      displaySnippet += '...';
    }

    return {
      text: displaySnippet,
      isExpandable: isExpandable,
    };
  }, [data.HIGHLIGHTS, expanded]);

  const visibleTags = useMemo(() => {
    return showAllTags ? data.KW : data.KW.slice(0, 6);
  }, [data.KW, showAllTags]);

  const hiddenTagsCount = data.KW.length - visibleTags.length;

  const relevanceMenuItems: MenuProps['items'] = [
    { key: '1', label: 'By Relevance' },
    { key: '2', label: 'By Date' },
    { key: '3', label: 'By Source' },
  ];

  const sentimentBadgeStyle = useMemo(() => {
    const baseStyle = styles.sentimentBadge;
    switch (data.SENT.toLowerCase()) {
      case 'positive':
        return `${baseStyle} ${styles.sentimentPositive}`;
      case 'negative':
        return `${baseStyle} ${styles.sentimentNegative}`;
      case 'neutral':
        return `${baseStyle} ${styles.sentimentNeutral}`;
      default:
        return `${baseStyle} ${styles.sentimentNeutral}`;
    }
  }, [data.SENT]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.left}>
          <span className={styles.date}>
            <span className={styles.dateDay}>{dateParts.day}</span>{' '}
            <span className={styles.dateMonthYear}>{dateParts.monthYear}</span>
          </span>
          <span className={styles.reach}>
            <span className={styles.reachNum}>{formattedReach}</span>{' '}
            <span className={styles.reachText}>Reach</span>
          </span>
          <span className={styles.traffic}>
            Top Traffic: {topTraffic}
          </span>
        </div>
        <div className={styles.sentimentSection}>
          <span className={sentimentBadgeStyle}>
            {data.SENT}
          </span>
          <span className={`${styles.headerIcon} ${styles.exclamationIconContainer}`}>
            <ExclamationCircleOutlined className={styles.exclamationIcon} />
          </span>
          <BorderOutlined className={styles.headerIcon} />
        </div>
      </div>

      <h2 className={styles.title}>
        <a href={data.URL} target="_blank" rel="noreferrer">
          {data.TI}
        </a>
      </h2>

      <div className={styles.meta}>
        <GlobalOutlined className={styles.globalIcon} />
        {data.FAV ? (
          <img
            className={styles.favicon}
            src={data.FAV}
            alt="Favicon"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none'; // Просто скрываем сломанное изображение
            }}
          />
        ) : (
          <LinkOutlined className={styles.faviconPlaceholder} /> // Используем LinkOutlined как заглушку
        )}
        <a href={`https://${data.DOM}`} className={styles.domainLink} target="_blank" rel="noreferrer">
          {data.DOM}
        </a>
        <Tooltip title={data.CNTR}>
          <img
            className={styles.flag}
            src={`https://flagcdn.com/w20/${data.CNTR_CODE.toLowerCase()}.png`}
            alt={data.CNTR}
          />
        </Tooltip>
        <span className={styles.lang}>{data.LANG}</span>
        <UserOutlined className={styles.authorIcon} />
        <span className={styles.authors}>
          {data.AU.slice(0, 2).join(', ')}
          {data.AU.length > 2 && <>, et al.</>}
        </span>
      </div>

      <div className={styles.snippet}>
        <p
          dangerouslySetInnerHTML={{
            __html: snippetContent.text
              .replace(/<kw>/g, `<span class="${styles.keywordHighlight}">`)
              .replace(/<\/kw>/g, '</span>'),
          }}
        />
        {snippetContent.isExpandable && (
          <Button
            className={styles.showMoreButton}
            type="link"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>
                Show less <CaretUpOutlined />
              </>
            ) : (
              <>
                Show more <CaretDownOutlined />
              </>
            )}
          </Button>
        )}
      </div>

      <div className={styles.tagsRow}>
        {visibleTags.map((tag: IData_TagItem) => (
          <Tag key={tag.value} className={styles.antTagCustom}>
            <span className={styles.tagName}>{tag.value}</span>
            <span className={styles.tagCount}>{tag.count}</span>
          </Tag>
        ))}
        {hiddenTagsCount > 0 && (
          <Button
            className={styles.showAllTagsButton}
            type="link"
            onClick={() => setShowAllTags(!showAllTags)}
          >
            {showAllTags ? (
              <>Show Less</>
            ) : (
              <>Show All +{hiddenTagsCount}</>
            )}
          </Button>
        )}
      </div>

      <div className={styles.linksRow}>
        <Button
          className={styles.originalSourceButton}
          type="default"
          onClick={() => window.open(data.URL, '_blank')}
        >
          Original Source
        </Button>
        <div className={styles.duplicatesSection}>
          <div className={styles.duplicatesInfo}>
            Duplicates: <span className={styles.duplicatesCount}>{data.DUPLICATES}</span>
          </div>
          <Dropdown menu={{ items: relevanceMenuItems }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()} className={styles.byRelevanceDropdown}>
              <span>By Relevance</span>
              <CaretDownOutlined className={styles.byRelevanceIcon} />
            </a>
          </Dropdown>
        </div>
      </div>

      <div className={styles.duplicatePreviewCard}>
        <div className={styles.duplicatePreviewHeader}>
          <span className={styles.duplicatePreviewDate}>
            <span className={styles.duplicateDateDay}>18</span>{' '}
            <span className={styles.duplicateDateMonthYear}>Jun 2024</span>
          </span>
          <span className={styles.duplicatePreviewReach}>
            <span className={styles.duplicateReachNum}>211K</span>{' '}
            <span className={styles.duplicateReachText}>Reach</span>
          </span>
          <div className={styles.duplicatePreviewIcons}>
            <span className={`${styles.duplicateHeaderIcon} ${styles.exclamationIconContainer}`}>
                <ExclamationCircleOutlined className={styles.exclamationIcon} />
            </span>
            <BorderOutlined className={styles.duplicateHeaderIcon} />
          </div>
        </div>
        <h3 className={styles.duplicatePreviewTitle}>
          Antivirus leggero: i migliori e più efficaci (free e a pagamento) 2024</h3>
        <div className={styles.duplicatePreviewMeta}>
          <img src={riaLogo} className={styles.duplicatePreviewFavicon} alt="Favicon ria.ru" />
          <a href="http://ria.ru" className={styles.duplicatePreviewSourceLink} target="_blank" rel="noreferrer">
            ria.ru
          </a>
          <img
            src={`https://flagcdn.com/w20/at.png`}
            className={styles.duplicatePreviewFlag}
            alt="Austria"
          />
          <span className={styles.duplicatePreviewCountry}>Austria</span>
          <UserOutlined className={styles.duplicatePreviewAuthorIcon} />
          <span className={styles.duplicatePreviewAuthors}>Emily C., Taormina A.</span>
        </div>
      </div>

      <Button
        className={styles.viewDuplicatesButton}
        onClick={() => setDuplicatesOpen(prev => !prev)}
      >
        {duplicatesOpen
          ? <CaretUpOutlined />
          : <CaretDownOutlined />
        }
        <span>View Duplicates</span>
      </Button>
    </div>
  );
};

export default NewsCard;
