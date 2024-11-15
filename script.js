const output = document.getElementById('output');
const input = document.getElementById('cli-input');

const commands = {
    help: () => `Available commands:<br>
    help - Show this help message<br>
    learn - Learn about electricity usage<br>
    estimate - Estimate appliance power usage<br>
    calculate - Calculate household energy consumption<br>
    tips - Get energy-saving tips`,

    learn: () => `Electricity usage is measured in kilowatt-hours (kWh).<br>
    1 kWh = 1000 watts used for 1 hour.<br>
    For example, a 100W light bulb used for 10 hours consumes 1 kWh.`,

    estimate: () => `To estimate an appliance's power usage:<br>
    1. Check the appliance's wattage (usually on a label)<br>
    2. Multiply wattage by hours used per day<br>
    3. Divide by 1000 to get kWh per day`,

    calculate: () => `To calculate your household energy consumption:<br>
    1. List all your appliances and their wattages<br>
    2. Estimate daily usage hours for each<br>
    3. Use the formula: (Watts * Hours) / 1000 = kWh per day<br>
    4. Sum up all appliances' kWh for total daily usage`,

    tips: () => `Energy-saving tips:<br>
    1. Use LED light bulbs<br>
    2. Unplug devices when not in use<br>
    3. Use energy-efficient appliances<br>
    4. Adjust thermostat settings<br>
    5. Improve home insulation`
};

function processCommand(cmd) {
    cmd = cmd.toLowerCase().trim();
    if (commands[cmd]) {
        return commands[cmd]();
    } else {
        return `Unknown command: ${cmd}. Type 'help' for available commands.`;
    }
}

if (input) {
    input.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            const cmd = this.value.trim();
            if (cmd) {
                output.innerHTML += `<div>> ${cmd}</div>`;
                output.innerHTML += `<div>${processCommand(cmd)}</div>`;
            } else {
                output.innerHTML += `<div>> </div>`;
                output.innerHTML += `<div>Please enter a command. Type 'help' for available commands.</div>`;
            }
            this.value = '';
            window.scrollTo(0, document.body.scrollHeight);
        }
    });

    document.addEventListener('click', function() {
        input.focus();
    });

    // Ensure the input is focused when the page loads
    window.onload = function() {
        input.focus();
    };
}

module.exports = { processCommand };
