# model
 
  안드로이드로부터 특징값을 입력받아 몸의 균형 및 걸음걸이 패턴을 분석해주는 모델입니다.
  
## API

### Execute

 json형식으로 입력받는 실행파일로 안드로이드로부터 입력받은 특징값을 분석해 결과를 json형식으로 반환해주는 파일입니다.
 
  - Input (json key)
    - `verticalWeightBias_Left` : 왼발의 앞/뒤꿈치 균형 편향
    - `verticalWeightBias_Right` : 오른발의 앞/뒤꿈치 균형 편향
    - `horizontalWeightBias` : 양 발의 균형 편향
    - `heelPressureDifference` : 양 발의 뒤꿈치 압력 차이
    - `leftPressure` : 걷기에서 얻은 왼발의 특징값
    - `rightPressure` : 걷기에서 얻은 오른발의 특징값
  
  - `run(verticalWeightBias_Left, verticalWeightBias_Right, horizontalWeightBias, heelPressureDifference, leftPressure, rightPressure)` : 결과 분석 실행 함수
   
    - return
      - dict
        - `staticPressureRes` : 정적 족저압 검사 결과
        - `percent` : 올바른 걸음걸이 척도
        - `gaitComment` : 걸음걸이 패턴 분석 결과
        - `diseaseNum` : 질병 번호
          | 식별자 | 국문 | 영문 | 아이콘 index |
          | ------ | -----| ----| --------|
          | 1 | 허리디스크    | Spinal disc herniation | FRACTURE[2, 1] |
          | 2 | 고관절염      | arthritis of the hip joint | FRACTURE[3, 2] |
          | 3 | 연골연화증    | Chondromalacia | FRACTURE[1, 4] |
          | 4 | 관절염        | arthritis | DIABETES[1, 0] |
  
  
### StaticPlantarPressureResAnalysis

 정적 족저압 검사 결과를 제공해주는 파일입니다.
  
  - `analysisStaticPressureResult(verticalWeightBias_Left, verticalWeightBias_Right, horizontalWeightBias, heelPressureDifference)` : 정적 족저압검사에 대한 comment를 반환
    
    - param
      - `verticalWeightBias_Left` : 왼발의 앞/뒤꿈치 균형 편향 정도
      - `verticalWeightBias_Right` : 오른발의 앞/뒤꿈치 균형 편향 정도
      - `horizontalWeightBias` : 양 발의 무게중심 편향 정도
      - `heelPressureDifference` : 양 발의 뒤꿈치 압력 차이값
   
    - return
      - `comment` : 각 발의 앞/뒤꿈치 균형 및 양 발의 균형, 척추측만증 의심여부를 판단한 comment


### GaitAnalysis

 걷기를 통해 얻은 걸음걸이 특징값을 입력받아 걸음걸이 패턴 분석 및 예축된 의심 질병에 대한 결과 제공입니다.
  
  - `walkCheck(leftPressure, rightPressure)` : 걷기 검사에 대한 결과를 반환 
    
    - param 
      - `leftPressure` : 걸어서 얻은 왼발의 특징값
      - `rightPressure` : 걸어서 얻은 어른발의 특징값
   
    - return
      - `percent` : 올바른 걸음걸이 척도
      - `comment` : 걸음걸이 패턴 및 예측되는 의심질병에 대한 comment
      - `disease` : 질병 아이콘 삽입을 위한 질병 번호
     

### WalkData

 총 5가지 걸음걸이 특징값들과 걸음걸이 패턴에 맞는 comment를 저장해놓은 파일입니다.
 
  - `normalGait` : 올바른 걸음걸이 특징값을 저장해놓은 클래스
    - `getLeft` : 왼발의 특징값을 반환
    - `getRight` : 오른발의 특징값을 반환
    
  - `out_toedGait` : 팔자 걸음걸이 특징값을 저장해놓은 클래스
    - `getLeft` : 왼발의 특징값을 반환
    - `getRight` : 오른발의 특징값을 반환
    
  - `in_toedGait` : 안짱 걸음걸이 특징값을 저장해놓은 클래스
    - `getLeft` : 왼발의 특징값을 반환
    - `getRight` : 오른발의 반환특징값을 반환
    
  - `craneGait` : 학다리 걸음걸이 특징값을 저장해놓은 클래스
    - `getLeft` : 왼발의 특징값을 반환
    - `getRight` : 오른발의 특징값을 반환
    
  - `elevenGait` :11자 걸음걸이 특징값을 저장해놓은 클래스
    - `getLeft` : 왼발의 특징값을 반환
    - `getRight` : 오른발의 특징값을 반환


### References
  -  정용주, 장진희, 이채혁, 이순걸, 이원구 (2013). 족저압을 이용한 외족지 보행 패턴 분석. 제어로봇시스템학회 국내학술대회 논문
집, 244-245
  - 이채혁, 문상찬, 임태균, 이순걸 (2011). 족저압 측정시스템의 개발 및 보행 상태에 따른 족저압 신호 특성 분석. 제어로봇시스템학
회 국내학술대회 논문집, 654-659
  - 홍주희, 최대영, 김경호 (2015). 압력센서를 이용한 족저압 측정 및 자세 분석에 관한 연구. 대한전기학회 학술대회 논문집, 21-24
  - 도주표, 최대영, 김동준, 김경호 (2017). 보행수 측정 및 보행패턴 분류 알고리즘. 전기학회논문지, 66(12), 1810-1814
  - 장진희, 정용주, 이순걸, 이원구 (2012). 걸음패턴에 따른 족저압 변화 연구. 제어로봇시스템학회 국내학술대회 논문집, 151-152
