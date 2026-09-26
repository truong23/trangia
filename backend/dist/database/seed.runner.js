"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
async function runSeed() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    console.log('Seed executed successfully through Nest Application Context!');
    await app.close();
}
runSeed().catch((err) => {
    console.error('Failed to seed:', err);
    process.exit(1);
});
//# sourceMappingURL=seed.runner.js.map