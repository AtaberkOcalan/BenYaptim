
const Search = () => {
  return (
    <div className="hidden md:flex flex-1">
      <input className="py-3 px-4 rounded-md rounded-r-none border-none outline-none flex flex-1 bg-slate-100" type="text" placeholder="Arama Yap..."/>
      <button className="p-2 bg-slate-100 rounded-r-md px-4 text-orange-600">Ara</button>
    </div>
  )
}

export default Search