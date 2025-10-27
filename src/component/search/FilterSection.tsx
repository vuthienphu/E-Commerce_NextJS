export default function FilterSection({ title, options, selectedValues, onChange }: { 
  title: string; 
  options: string[]; 
  selectedValues: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="filter-section">
      <h3>{title}</h3>
      <ul>
        {options.map((opt, i) => (
          <li key={i}>
            <input 
              type="checkbox"
              checked={selectedValues.includes(opt)}
              onChange={() => onChange(opt)}
            />
            <label>{opt}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}
