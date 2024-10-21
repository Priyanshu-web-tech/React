export default function Accordion({ children, className }) {
  return (
    <ul className={className}>
      {children.map((item, index) => (
        <li key={index}>
          <button>{item.title}</button>
          <p>{item.content}</p>
        </li>
      ))}
    </ul>
  );
}
