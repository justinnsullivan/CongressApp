import { combineReducers } from 'redux';
import {
    selectedDistrict,
    selectedChamber,
    legislatorsByDistrict,
} from './legislatorsReducer';
import {
    currentApp,
    votesPosition,
    billsPosition,
    legislatorsPosition,
    congressMapToggle
}from './appControlsReducer'
import {
    selectedLegislatorId,
    legislatorInfoById,
} from './legislatorInfoReducer';
import {
    votesByChamber,
    selectedDate,
} from './votesReducer';
import {
    billsByStatus,
    selectedBillStatus,
} from './billsReducer';
import {
    billInfoById,
    selectedBillId,
} from './billInfoReducer';
import {
    tallyByRollCall,
    selectedRollCall,
} from './voteTallyReducer';

const rootReducer = combineReducers({
    currentApp,
    votesPosition,
    billsPosition,
    legislatorsPosition,
    congressMapToggle,
    tallyByRollCall,
    selectedRollCall,
    legislatorsByDistrict,
    selectedDistrict,
    votesByChamber,
    selectedDate,
    selectedChamber,
    selectedLegislatorId,
    legislatorInfoById,
    billsByStatus,
    selectedBillStatus,
    billInfoById,
    selectedBillId,
});

export default rootReducer;
