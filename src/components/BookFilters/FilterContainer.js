import React from 'react'
import { connect } from 'react-redux'

import { 
    cleanFilters, setAuthorFilter, setCategoryFilter, setPublishersFilter 
} from '../../services/actions/BookFilterActions';
import FilterCheckList from './FilterCheckList/FilterCheckList';

/**
 * Container contendo os filtros 
 */
function FilterContainer(props) {
    // PROPS
    const { title } = props
    const { authorsFilter, categoriesFilter, publishersFilter } = props.filters
    const { authors, categories, publishers } = props.data

    // Function para check do filter
    const handleItemChecked = (e, arr, action) => {
        const itemCkd = e.target.value
        let newSelected = []

        if (!arr.includes(itemCkd))
            newSelected = ([...arr, itemCkd])
        else 
            newSelected = (arr.filter(aut => aut !== itemCkd))

        action(newSelected)
    }

    // filtros a renderizar
    const filters = [
        { 
            title: 'Categorias',
            filterFields: categories,
            filteredData: categoriesFilter,
            onCheck: e => handleItemChecked(e, categoriesFilter, props.setCategoryFilter),
            cleanAction: () => (categoriesFilter.length > 0) && props.setCategoryFilter([]),
        },
        { 
            title: 'Autores',
            filterFields: authors,
            filteredData: authorsFilter,
            onCheck: e => handleItemChecked(e, authorsFilter, props.setAuthorFilter),
            cleanAction: () => (authorsFilter.length > 0) && props.setAuthorFilter([]),
        },
        { 
            title: 'Editoras',
            filterFields: publishers,
            filteredData: publishersFilter,
            onCheck: e => handleItemChecked(e, publishersFilter, props.setPublishersFilter),
            cleanAction: () => (publishersFilter.length > 0) && props.setPublishersFilter([]),
        },
    ]

    return (
        <div>
            <h5 className="d-none d-md-flex">{ title }</h5>
            { filters.map((item, idx) => (
                <FilterCheckList
                    key={`filter-list-${idx}`}
                    {...item}
                />
            )) }
        </div>
    )
}

// REDUX
const mapStateToProps = ({ filters, data }) => ({
    filters,
    data
})

const mapDispatchToProps = {
    cleanFilters, 
    setAuthorFilter,
    setCategoryFilter,
    setPublishersFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterContainer)
