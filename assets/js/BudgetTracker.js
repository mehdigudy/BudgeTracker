export default class BudgeTracker {

    constructor(querySelectorString) {

        this.root = document.querySelector(querySelectorString);
        this.root.innnerHtml = BudgeTracker.entryHtml();
        this.root.querySelector('.new-entry-btn').addEventListener('click', this.onNewEntryBtnClick());
        this.load();

    }

    static html() {
        return `
        

        <table class="budget-tracker">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody class="entries"></tbody>
            <tbody>
                <tr>
                    <td colspan="5" class="controls">
                        <button type="button" class="new-entry"> new Entry</button>
                    </td>
                </tr>
            </tbody>

            <tfoot>
                <tr>
                    <td colspan="5" class="summry">
                        <span>
                            <strong>Total :</strong>
                            <span class="total">0</span>
                        </span>

                    </td>
                </tr>
            </tfoot>

        
        `

    }
    static entryHtml() {
        return `
        
               <tr>
                    <td>
                        <input class="input input-type" type="date">
                    </td>
                    <td>
                        <input class="input input-description" type="text" placeholder="Add a description ">

                    </td>
                    <td>
                        <select name="input input-type ">

                            <option value="income">Income</option>
                            <option value="expense">Expense</option>

                        </select>

                    </td>
                    <td>
                        <input type="number" class="type type-amount">
                    </td>
                    <td>
                        <button class="btn delete-entry">Delete</button>
                    </td>
                </tr>
        `;
    }
    load() {


    }
    updateSummary() { }

    save() {

    }
    addEntry(entry = {}) {

    }

    getEntry() {


    }
    onNewEntryBtnClick() {
    }
    onDeleteEntryBtnClick(e) { }



}


}