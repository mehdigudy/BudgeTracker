export default class BudgeTracker {

    #root;

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

    constructor(querySelectorString) {

        this.#root = document.querySelector(querySelectorString); //return element
        this.#root.innerHTML = BudgeTracker.html();
        this.#root.querySelector('.new-entry').addEventListener('click', e => {
            this.#onNewEntryBtnClick(e)
        });
        this.#load();
    }

    static html = () => {
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
            <tbody class="entries">
            
            </tbody>
            <tbody>
                <tr>
                    <td colspan="5" class="controls">
                        <button type="button" class="new-entry"> new Entry</button>
                    </td>
                </tr>
            </tbody>

            <tfoot>
                <tr>
                    <td colspan="5" class="summary">
                        <span>
                            <strong>Total :</strong>
                            <span class="total">0</span>
                        </span>

                    </td>
                </tr>
            </tfoot>
        `

    }

    #onNewEntryBtnClick = (e) => {
        this.#addEntry();

    }
    #onDeleteEntryBtnClick = (e) => {
        e.target.closest("tr").remove();
        this.#save()
    }
    #getEntryRows = () => {
        return Array.from(this.#root.querySelectorAll(".entries tr"));

    }
    #updateSummary = () => {
        const total = this.#getEntryRows().reduce((total, row) => {
            const amount = row.querySelector(".input-amount").value;
            const isExpense = row.querySelector(".input-type").value === "expense";
            const modifier = isExpense ? -1 : 1;
            return total + (amount * modifier);
        }, 0);

        const totalFormatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',

        }).format(total);

        this.#root.querySelector(".total").textContent = totalFormatted;
    }
    #save = () => {
        const data = this.#getEntryRows();
        data.map(row => {
            return {
                data: row.querySelector('.input-date').value,
                description: row.querySelector('.input-description').value,
                type: row.querySelector('.input-type').value,
                amount: parseFloate(row.querySelector('.input-amount').value)
            }
        })
        loacalStorage.setItem('budget-tracker-entries', JSON.stringify(data));
        this.#updateSummary();
    }
    #addEntry = (entry = {}) => {
        this.#root.querySelector(".entries").insertAdjacentHTML('beforeend', BudgeTracker.entryHtml());
        const row = this.#root.querySelector(".entries tr:last-of-type");
        row.querySelector(".input-type").value = entry.date || new Date().toISOString().replace(/T.*/, ' ');
        row.querySelector(".input-description").value = entry.description || '';
        row.querySelector(".type-type").value = entry.type || 'income';
        row.querySelector(".type-amount").value = entry.amount || 0;
        row.querySelector(".delete-entry").addEventListener('click', e => {
            this.#onDeleteEntryBtnClick(e);

        });
        row.querySelectorAll(".input ").forEach(input => {
            input.addEventListener("change", () => {
                this.#save()
            })
        });
    }
    #load = () => {
        const entries = JSON.parse(localStorage.getItem('budget-tracker-entries') || '[]');
        for (const entry of entries) {
            this.#addEntry(entry);
        }
        this.#updateSummary();
    }


}


