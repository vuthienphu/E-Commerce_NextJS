export default function FilterSection({ title, options, selectedValues, onChange }: { 
  title: string; 
  options: string[]; 
  selectedValues: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="filter-section">
      <h3>{title}</h3>
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {options.map((opt, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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