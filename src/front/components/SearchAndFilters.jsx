// components/SearchAndFilters.jsx
import React from "react";

const SearchAndFilters = React.memo(({
    searchTerm,
    setSearchTerm,
    apiFilterOptions,
    selectedFilters,
    toggleFilter,
    setSelectedFilters
}) => (
    <div className="bg-light py-5" style={{ background: "linear-gradient( #fff5eb)" }}>
        <div className="container">
            {/* Hero Section */}
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold" style={{ color: "#78350f" }}>
                    Encuentra tu Café Perfecto
                </h1>
                <p className="lead" style={{ color: "#78350f" }}>
                    Descubre cafeterías increíbles cerca de ti y conecta con la comunidad cafetera
                </p>
            </div>

            {/* Barra de búsqueda */}
            <div className="row justify-content-center mb-4">
                <div className="col-md-8 col-lg-6">
                    <div className="input-group">
                        <span className="input-group-text bg-white border-end-0">
                            <i className="fas fa-search text-muted"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0"
                            placeholder="Buscar cafeterías o ubicaciones..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Filtros dinámicos */}
            <div className="d-flex align-items-center justify-content-center mb-5 gap-3 flex-wrap">
                <span className="badge text-dark d-flex align-items-center me-2">
                    <i className="fas fa-filter me-1"></i>
                    Filtros:
                </span>
                {apiFilterOptions.map((filter) => {
                    const isSelected = selectedFilters.includes(filter.id.toString());
                    return (
                        <button
                            key={filter.id}
                            onClick={() => toggleFilter(filter.id.toString())}
                            className={`btn px-3 py-2 ${isSelected ? "btn-filter-active" : "btn-filter-inactive"}`}
                            style={{
                                backgroundColor: isSelected ? '#7c2d12' : 'white',
                                color: isSelected ? 'white' : '#7c2d12',
                                border: '2px solid #7c2d12',
                                borderRadius: '25px',
                                transition: 'all 0.3s ease',
                                fontWeight: '500'
                            }}
                        >
                            <i className={`${filter.icon} me-1`}></i>
                            {filter.label}
                        </button>
                    );
                })}
                {selectedFilters.length > 0 && (
                    <button
                        onClick={() => setSelectedFilters([])}
                        className="btn btn-outline-secondary px-3 py-2"
                        style={{ borderRadius: '25px' }}
                    >
                        <i className="fas fa-times me-1"></i>
                        Limpiar filtros
                    </button>
                )}
            </div>

            {selectedFilters.length > 0 && (
                <div className="text-center mb-3">
                    <small className="text-muted">
                        Filtrando por: {selectedFilters.length} categoría{selectedFilters.length !== 1 ? 's' : ''}
                    </small>
                </div>
            )}
        </div>
    </div>
));

export default SearchAndFilters;