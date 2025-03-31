# Node 18 alpine 버전 사용
FROM node:18-alpine

# 작업 디렉토리 생성
WORKDIR /app

# 패키지 정의만 먼저 복사해서 캐시 활용
COPY package.json yarn.lock ./

# 의존성 설치
RUN yarn install

# 전체 코드 복사
COPY . .

# 빌드
RUN yarn build

# 포트 오픈
EXPOSE 3000

# 실행
CMD ["yarn", "start"]
