import { combineReducers } from 'redux'
import folders from './folders'
import currentFolder from './currentFolder'

const imageApp = combineReducers({
	folders,
	currentFolder
})

export default imageApp