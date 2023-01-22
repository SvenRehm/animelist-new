export default function SelectComponent({
   value,
   onChange,
   options,
   className,
}) {
   return (
      <select
         value={value}
         onChange={(e) => {
            onChange(e.target.value)
         }}
         className={`w-[250px]  border border-[rgba(255,255,255,0.25)] text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 inline  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
      >
         {options.map((option, index) => (
            <option key={index} value={option}>
               {option}
            </option>
         ))}
      </select>
   )
}
