FROM mcr.microsoft.com/playwright:v1.16.2-focal

COPY ./playwright /e2e
WORKDIR /e2e
RUN npm install
RUN npx playwright install
# Run playwright test
CMD [ "npx", "playwright", "test", "--reporter=list" ]