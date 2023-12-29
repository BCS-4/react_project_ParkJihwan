# PFP Project

<img src="/readmeImg.png">

이 프로젝트는 PFP 프로젝트로 NFT를 사고 팔수 있는 프로젝트 입니다.

사이트 주소 (https://pfp-project-three.vercel.app/)

## 활용 기술

1. Typescript
2. React
3. Solidity

## 특징 및 기능

1. NFT를 민팅
2. NFT를 판매
3. 내 보유 NFT 보관

## 폴더 구성

|------contracts
| |
| |---- MintNFT.sol
| |---- SaleNFT.sol
|
|------Frontend
| |
| |------ components
| | |
| | |---- Header.tsx
| | |---- Layout.tsx
| | |---- MintModal.tsx
| | |---- MyNftCard.tsx
| | |---- NftCard.tsx
| | |---- SaleNftCard.tsx
| |------ pages
| | |
| | |---- detail.tsx
| | |---- home.tsx
| | |---- my.tsx
| | |---- sale.tsx
| |
| |------ abis
| | |
| | |---- contractAddress.ts
| | |---- mintNftABi.json
| | |---- saleNftAbi.json
| |
| |------ types
| | |
| | |---- index.d.ts
| |
| |------App.tsx
