beforeAll(() => {
	// Mock the DOM elements
	document.body.innerHTML = `
			<div id="terminal">
					<div id="output"></div>
					<div id="input-line">
							<span class="prompt">$</span>
							<input type="text" id="cli-input" autofocus>
					</div>
			</div>
	`;
});

const { processCommand } = require('../script');

describe('processCommand', () => {
	test('should return help message for "help" command', () => {
			const result = processCommand('help').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`Available commands:<br> help - Show this help message<br> learn - Learn about electricity usage<br> estimate - Estimate appliance power usage<br> calculate - Calculate household energy consumption<br> tips - Get energy-saving tips`.replace(/\s+/g, ' ').trim());
	});

	test('should return learn message for "learn" command', () => {
			const result = processCommand('learn').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`Electricity usage is measured in kilowatt-hours (kWh).<br> 1 kWh = 1000 watts used for 1 hour.<br> For example, a 100W light bulb used for 10 hours consumes 1 kWh.`.replace(/\s+/g, ' ').trim());
	});

	test('should return estimate message for "estimate" command', () => {
			const result = processCommand('estimate').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`To estimate an appliance's power usage:<br> 1. Check the appliance's wattage (usually on a label)<br> 2. Multiply wattage by hours used per day<br> 3. Divide by 1000 to get kWh per day`.replace(/\s+/g, ' ').trim());
	});

	test('should return calculate message for "calculate" command', () => {
			const result = processCommand('calculate').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`To calculate your household energy consumption:<br> 1. List all your appliances and their wattages<br> 2. Estimate daily usage hours for each<br> 3. Use the formula: (Watts * Hours) / 1000 = kWh per day<br> 4. Sum up all appliances' kWh for total daily usage`.replace(/\s+/g, ' ').trim());
	});

	test('should return tips message for "tips" command', () => {
			const result = processCommand('tips').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`Energy-saving tips:<br> 1. Use LED light bulbs<br> 2. Unplug devices when not in use<br> 3. Use energy-efficient appliances<br> 4. Adjust thermostat settings<br> 5. Improve home insulation`.replace(/\s+/g, ' ').trim());
	});

	test('should return unknown command message for unknown command', () => {
			const result = processCommand('unknown').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`Unknown command: unknown. Type 'help' for available commands.`.replace(/\s+/g, ' ').trim());
	});
});
