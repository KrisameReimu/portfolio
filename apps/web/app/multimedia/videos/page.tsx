import PageShell from "../../../components/PageShell";
import styles from "../../site.module.scss";
import {getAllVideos} from "../../../lib/content/media";
import {createMetadata} from "../../../lib/metadata";
import {formatDate} from "../../../lib/utils";

export const metadata = createMetadata({
  title: "Videos",
  description:
    "A year-first archive of documentary, showcase, and visual storytelling work.",
  path: "/multimedia/videos"
});

export default async function MultimediaVideosPage() {
  const videos = await getAllVideos();

  return (
    <PageShell
      eyebrow="Video Archive"
      title="Motion work arranged for clarity and story."
      summary="This archive favors cinematic cards and clear context over noisy UI or decorative clutter."
    >
      {!videos.length ? (
        <p className={styles.emptyState}>No video work is published yet.</p>
      ) : (
        <section className={styles.mediaGrid}>
          {videos.map(video => (
            <article key={video.id} className={styles.mediaCard}>
              <div className={styles.mediaThumb}>
                <img src={video.thumbnail} alt={video.title} />
              </div>
              <h2 className={styles.mediaCardTitle}>{video.title}</h2>
              <p className={styles.sectionLead}>{video.description}</p>
              <div className={styles.mediaMeta}>
                <span>{formatDate(video.date)}</span>
                {video.platform ? <span>{video.platform}</span> : null}
              </div>
              {video.embedUrl ? (
                <a href={video.embedUrl} className={styles.textLink}>
                  Open video
                </a>
              ) : null}
            </article>
          ))}
        </section>
      )}
    </PageShell>
  );
}
