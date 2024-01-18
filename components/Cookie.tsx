interface CookieProps {
  name: string;
  description: string;
  calories: string;
  imageUrl: string;
}

export const Cookie: React.FC<CookieProps> = ({
  name,
  description,
  calories,
  imageUrl,
}) => (
  <div>
    <img src={imageUrl} alt={name} />
    <h2 className="text-2xl font-bold">{name}</h2>
    <p>{description}</p>
    <p>{calories}</p>
  </div>
);
