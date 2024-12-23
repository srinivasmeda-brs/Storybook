const StoryItem = ({ story, onDelete,onEdit }) => {
    
  const { title, content, isPublished, likes, publishedAt } = story;

  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p>{content}</p>
      <p><strong>Likes:</strong> {likes}</p>
      <p><strong>Published:</strong> {isPublished ? 'Yes' : 'No'}</p>
      {isPublished && <p><strong>Published At:</strong> {new Date(publishedAt).toLocaleDateString()}</p>}
      <div style={styles.actions}>
        <button onClick={onDelete} style={styles.deleteBtn}>Delete</button>
        <button onClick = {onEdit} style={styles.editBtn}   >Edit</button>
        {!isPublished && <button style={styles.publishBtn}>Publish</button>}
        
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  actions: {
    display: 'flex',
    gap: '10px',
  },
  deleteBtn: { background: 'red', color: 'white' },
  editBtn: { background: 'orange', color: 'white' },
  publishBtn: { background: 'green', color: 'white' },
};

export default StoryItem;
