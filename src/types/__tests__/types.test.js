import { TYPES } from '../types';

describe('Tests on TYPES', () => {
    test('should have the correct TYPES', () => {
        expect(TYPES).toEqual({
            UI_OPEN_MODAL: '[UI] Open Modal',
            UI_CLOSE_MODAL: '[UI] Close Modal',

            EVENT_ADD_NEW: '[EVENT] Add New',
            EVENT_SET_ACTIVE: '[EVENT] Set Active',
            EVENT_CLEAR_ACTIVE: '[EVENT] Clear Active',
            EVENT_CLEAR_ALL: '[EVENT] Clear All',
            EVENT_UPDATED: '[EVENT] Update Event',
            EVENT_DELETED: '[EVENT] Delete Event',
            EVENT_LOADED: '[EVENT] Load Events',

            AUTH_LOGIN: '[AUTH] Login',
            AUTH_LOGOUT: '[AUTH] Logout',
            AUTH_CHECKING_FINISH: '[AUTH] Finish checking login state',
        });
    });
});
