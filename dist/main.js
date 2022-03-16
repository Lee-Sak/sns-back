"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const path = require("path");
const http_exception_filter_1 = require("./common/exceptions/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
        prefix: '/media',
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Sns example')
        .setDescription('The sns API description')
        .setVersion('1.0')
        .addTag('sns')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors({
        origin: true,
        credentials: true,
    });
    await app.listen(8000);
}
bootstrap();
//# sourceMappingURL=main.js.map