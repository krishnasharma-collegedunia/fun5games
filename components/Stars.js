export default function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.3;
  const stars = [];
  for (let i = 0; i < full; i++) stars.push('★');
  if (half) stars.push('½');
  return (
    <span className="rating-stars">
      {stars.join('')}
      <span className="rating-num">{rating.toFixed(1)}</span>
    </span>
  );
}
