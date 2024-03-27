import { fetchDemands, acceptDemand, declineDemand } from '../redux/DemandSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';

const DemandList = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const { demands, loading, error } = useSelector((state) => state.demand);
 const [filterType, setFilterType] = useState('');
 const [filterDate, setFilterDate] = useState('');
 const [searchQuery, setSearchQuery] = useState('');

 useEffect(() => {
    dispatch(fetchDemands());
 }, [dispatch]);

 const handleAccept = (id, type) => {
    if (type === 'retirer tamporeirement du bac') {
      navigate('/bac-retirer');
      dispatch(acceptDemand({ id, status: 'Waiting Return' }));
    } else {
      dispatch(acceptDemand({ id, status: 'Accepted' }));
      navigate('/historique');
    }
 };

 const handleDecline = (id) => {
    dispatch(declineDemand(id));
 };

 const resetFilters = () => {
    setFilterType('');
    setFilterDate('');
    setSearchQuery('');
 };

 if (loading) return <div>Loading...</div>;
 if (error) return <div>Error: {error}</div>;

 const filteredDemands = demands.filter((demand) => {
  const isTypeMatch = filterType === '' || demand.type === filterType;
  const isDateMatch = filterDate === '' || (demand.created_at && demand.created_at.includes(filterDate));
  const isSearchMatch =
    searchQuery === '' ||
    (demand.stagiaire && demand.stagiaire.user && demand.stagiaire.user.nom && demand.stagiaire.user.nom.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (demand.stagiaire && demand.stagiaire.user && demand.stagiaire.user.cin && demand.stagiaire.user.cin.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (demand.stagiaire && demand.stagiaire.user && demand.stagiaire.user.prenom && demand.stagiaire.user.prenom.toLowerCase().includes(searchQuery.toLowerCase()));
  return isTypeMatch && isDateMatch && isSearchMatch;
});

 return (
    <div className="container mx-auto px-4 py-8">
      {/* Filtering and Search UI */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        {/* Filter by Type */}
        <div className="mb-4 sm:mb-0">
          <label htmlFor="filterType" className="block mb-1">Filter by Type:</label>
          <select
            id="filterType"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border rounded-md px-2 py-1"
          >
            <option value="">All</option>
            <option value="certificat du suivi de formation">Certificat du suivi de formation</option>
            <option value="retirer tamporeirement">Retirer tamporeirement du bac</option>
            <option value="retirer definitement du bac">Retirer definitement du bac</option>
          </select>
          <button onClick={resetFilters} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">Reset</button>
        </div>
        {/* Filter by Date */}
        <div className="mb-4 sm:mb-0">
          <label htmlFor="filterDate" className="block mb-1">Filter by Date:</label>
          <input
            id="filterDate"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border rounded-md px-2 py-1"
          />
        </div>
        {/* Search */}
        <div className="flex items-center">
          <label htmlFor="searchQuery" className="block mb-1">Search : </label>
          <div className="relative">
            <input
              id="searchQuery"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name"
              className="border rounded-md px-2 py-1 pl-8 pr-3"
            />
            <RiSearchLine className="absolute h-5 w-5 text-gray-500 top-1/2 transform -translate-y-1/2 left-3" />
          </div>
        </div>
      </div>

      {/* Demand List Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Stagiaire</th>
            <th className="border px-4 py-2">CEF</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredDemands.map((demand) => (
            <tr key={demand.id}>
              {demand.status === 'Pending' && (
                <>
                 <td className="border px-4 py-2">{demand.id}</td>
                 <td className="border px-4 py-2">{demand.stagiaire.user.nom} {demand.stagiaire.user.prenom}</td>
                 <td className="border px-4 py-2">{demand.stagiaire.cef}</td>
                 <td className="border px-4 py-2">{demand.type}</td>
                 <td className="border px-4 py-2">
                    <button className="border bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => handleAccept(demand.id, demand.type)}>Accept</button>
                    <button className="border bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDecline(demand.id)}>Decline</button>
                 </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
 );
};

export default DemandList;