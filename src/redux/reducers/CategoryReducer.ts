import { CategoryProps } from "../../interfaces/Category"
import { ReduxAction } from "../../interfaces/ReduxAction"

export interface CategoryState {
    category: CategoryProps[]
}

const INITIAL_STATE: CategoryState = {
    category: [],
  };

const CategoryReducer = (state = INITIAL_STATE, action: ReduxAction<CategoryState>) : CategoryState => {
    
    switch(action.type) {
        case 'SET_CATEGORY':
            return {category: action?.payload?.category}
        default:
            return state
    }
}

export default CategoryReducer