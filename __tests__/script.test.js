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
	beforeEach(() => {
			// Reset the state before each test
			currentState = 'main';
			currentWatts = 0;
			electricityRate = null;
			appliances = [];
			currentAppliance = {};
	});

	test('should return help message for "help" command', () => {
			const result = processCommand('help').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`Available commands:<br> 1. help - Show this help message<br> 2. learn - Learn about electricity usage<br> 3. estimate - Estimate appliance power usage<br> 4. calculate - Calculate household energy consumption<br> 5. bill - Calculate your monthly electricity bill<br> 6. rate - Set the electricity rate<br> 7. tips - Get energy-saving tips`.replace(/\s+/g, ' ').trim());
	});

	test('should return learn message for "learn" command', () => {
			const result = processCommand('learn').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`Electricity usage is measured in kilowatt-hours (kWh).<br> 1 kWh = 1000 watts used for 1 hour.<br> For example, a 100W light bulb used for 10 hours consumes 1 kWh.`.replace(/\s+/g, ' ').trim());
	});

	test('should return estimate message for "estimate" command', () => {
			const result = processCommand('estimate').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`Enter the wattage of your appliance:`.replace(/\s+/g, ' ').trim());
	});

	test('should return calculate message for "calculate" command', () => {
			const result = processCommand('calculate').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`To calculate your household energy consumption enter the wattage of your appliance:`.replace(/\s+/g, ' ').trim());
	});

	test('should return bill message for "bill" command', () => {
			const result = processCommand('bill').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`Please set the electricity rate first. Enter the new electricity rate in $/kWh:`.replace(/\s+/g, ' ').trim());
	});

	test('should return rate message for "rate" command', () => {
			const result = processCommand('rate').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`Enter the new electricity rate in $/kWh:`.replace(/\s+/g, ' ').trim());
	});

	test('should return tips message for "tips" command', () => {
			const result = processCommand('tips').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`Energy-saving tips:<br> 1. Use LED light bulbs<br> 2. Unplug devices when not in use<br> 3. Use energy-efficient appliances<br> 4. Adjust thermostat settings<br> 5. Improve home insulation`.replace(/\s+/g, ' ').trim());
	});

	test('should return unknown command message for unknown command', () => {
			const result = processCommand('unknown').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`Unknown command: unknown. Type 'help' for available commands.`.replace(/\s+/g, ' ').trim());
	});

	test('should handle wattage input for estimate command', () => {
			processCommand('estimate');
			const result = processCommand('100').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`Enter the number of hours the 100W appliance is used per day:`.replace(/\s+/g, ' ').trim());
	});

	test('should handle hours input for estimate command', () => {
			processCommand('estimate');
			processCommand('100');
			const result = processCommand('10').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`Your 100W appliance used for 10 hours per day consumes 1.00 kWh per day.`.replace(/\s+/g, ' ').trim());
	});

	test('should handle invalid wattage input for estimate command', () => {
			processCommand('estimate');
			const result = processCommand('invalid').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`Please enter a valid number for wattage.`.replace(/\s+/g, ' ').trim());
	});

	test('should handle invalid hours input for estimate command', () => {
			processCommand('estimate');
			processCommand('100');
			const result = processCommand('invalid').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`Please enter a valid number for hours.`.replace(/\s+/g, ' ').trim());
	});

	test('should handle valid rate input for rate command', () => {
			processCommand('rate');
			const result = processCommand('0.15').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`The new electricity rate is set to $0.15 per kWh.`.replace(/\s+/g, ' ').trim());
	});

	test('should handle invalid rate input for rate command', () => {
			processCommand('rate');
			const result = processCommand('invalid').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`Please enter a valid number for the electricity rate.`.replace(/\s+/g, ' ').trim());
	});

	test('should handle bill calculation after setting rate', () => {
			processCommand('rate');
			processCommand('0.15');
			processCommand('bill');
			const result = processCommand('100').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`Your estimated monthly electricity bill for 100 kWh is $15.00.`.replace(/\s+/g, ' ').trim());
	});

	test('should handle adding appliances for calculate command', () => {
			processCommand('calculate');
			processCommand('100');
			processCommand('5');
			processCommand('200');
			processCommand('3');
			const result = processCommand('done').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`Your total daily usage is 1.10 kWh. Would you like to estimate your monthly bill? (yes/no)`.replace(/\s+/g, ' ').trim());
	});

	test('should handle monthly bill estimation after adding appliances', () => {
			processCommand('rate');
			processCommand('0.15');
			processCommand('calculate');
			processCommand('100');
			processCommand('5');
			processCommand('200');
			processCommand('3');
			processCommand('done');
			const result = processCommand('yes').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`Your estimated monthly electricity bill is $4.95.`.replace(/\s+/g, ' ').trim());
	});

	test('should handle setting rate during calculation', () => {
			processCommand('calculate');
			processCommand('100');
			processCommand('5');
			processCommand('done');
			processCommand('yes');
			processCommand('rate');
			const result = processCommand('0.15').replace(/\s+/g, ' ').trim();
			expect(result).toBe(`The new electricity rate is set to $0.15 per kWh. Your estimated monthly electricity bill is $4.50.`.replace(/\s+/g, ' ').trim());
	});
});
