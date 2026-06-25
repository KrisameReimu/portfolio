import PageShell from "../../../components/PageShell";
import styles from "../../site.module.scss";
import {getAllPhotos} from "../../../lib/content/media";
import {createMetadata} from "../../../lib/metadata";
import {formatDate} from "../../../lib/utils";

export const metadata = createMetadata({
  title: "Photos",
  description:
    "A gallery-first archive for still images, city observation, and visual notes.",
  path: "/multimedia/photos"
});

export default async function MultimediaPhotosPage() {
  const photos = await getAllPhotos();

  return (
    <PageShell
      eyebrow="Photo Archive"
      title="A quieter, image-first archive."
      summary="This archive is designed to keep the visual work calm: less chrome, less noise, and more room for the image."
    >
      {!photos.length ? (
        <p className={styles.emptyState}>
          The photo archive is being prepared. The route is stable; the content
          will grow when the image sets are ready.
        </p>
      ) : (
        <section className={styles.mediaGrid}>
          {photos.map(photo => (
            <article key={photo.id} className={styles.mediaCard}>
              <div className={styles.mediaThumb}>
                <img src={photo.cover} alt={photo.title} />
              </div>
              <h2 className={styles.mediaCardTitle}>{photo.title}</h2>
              <div className={styles.mediaMeta}>
                <span>{formatDate(photo.date)}</span>
                {photo.location ? <span>{photo.location}</span> : null}
                {photo.device ? <span>{photo.device}</span> : null}
              </div>
            </article>
          ))}
        </section>
      )}
    </PageShell>
  );
}
