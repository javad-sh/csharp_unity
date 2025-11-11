import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'آموزش گام‌به‌گام',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        از صفر تا صد برنامه‌نویسی C# و بازی‌سازی با Unity را به صورت منظم و ساختاریافته یاد بگیرید.
        مناسب برای تمام سطوح از مبتدی تا پیشرفته.
      </>
    ),
  },
  {
    title: 'مستندات فارسی کامل',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        تمام مفاهیم اساسی C# و Unity به زبان فارسی با مثال‌های کاربردی.
        دیگر نیازی به جستجوی مداوم در منابع انگلیسی نیست.
      </>
    ),
  },
  {
    title: 'نکات و الگوهای کاربردی',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Design Patterns، بهترین شیوه‌های کدنویسی و نکات حرفه‌ای برای
        توسعه پروژه‌های واقعی و حرفه‌ای.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
