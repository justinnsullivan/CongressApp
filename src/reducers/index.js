import { combineReducers } from 'redux';
import {
    selectedDistrict,
    selectedChamber,
    legislatorsByDistrict,
} from './legislatorsReducer';
import {
    selectedLegislatorId,
    legislatorInfoById,
} from './legislatorInfoReducer';
import {
    votesByDayNum,
    selectedDayNum,
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
    tallyByRollCall,
    selectedRollCall,
    legislatorsByDistrict,
    selectedDistrict,
    votesByDayNum,
    selectedDayNum,
    selectedChamber,
    selectedLegislatorId,
    legislatorInfoById,
    billsByStatus,
    selectedBillStatus,
    billInfoById,
    selectedBillId,
});

export default rootReducer;
