import { TestBed } from '@angular/core/testing';
import { ArraysToolService } from './arrays-tool.service';
describe('ArraysToolService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ArraysToolService);
    });
    it('should move element from its current position to a new index', () => {
        const original = [1, 2, 3, 4, 5];
        //move from index 2 (3) to index 1 so it should be [1,3,2,4,5]
        service.moveElementInArray(original, original[2], 1);
        expect(original[1]).toBe(3);
    });
    it('should move element left', () => {
        const original = [1, 2, 3, 4, 5];
        //move from index 2 (3) to index 1 so it should be [1,3,2,4,5]
        service.moveElementLeft(original, original[2]);
        expect(original[1]).toBe(3);
    });
    it('should move element right', () => {
        const original = [1, 2, 3, 4, 5];
        //move from index 2 (3) to index 1 so it should be [1,3,2,4,5]
        service.moveElementRight(original, original[2]);
        expect(original[3]).toBe(3);
    });
    it('should move element left from the given index', () => {
        const original = [1, 2, 3, 4, 5];
        //move from index 2 (3) to index 1 so it should be [1,3,2,4,5]
        service.moveElementAtIndexLeft(original, 2);
        expect(original[1]).toBe(3);
    });
    it('should move element right from the given index', () => {
        const original = [1, 2, 3, 4, 5];
        //move from index 2 (3) to index 1 so it should be [1,3,2,4,5]
        service.moveElementAtIndexRight(original, 2);
        expect(original[3]).toBe(3);
    });
    it('should remove the given element from the array', () => {
        const original = [1, 'two', 3, 4, 5];
        //move from index 2 (3) to index 1 so it should be [1,3,2,4,5]
        const newOne = service.removeFromArray(original, original[0]);
        expect(newOne[0]).toBe('two');
    });
});
//# sourceMappingURL=arrays-tool.service.spec.js.map