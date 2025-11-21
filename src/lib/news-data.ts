import type { NewsItem, Region } from "@/types";

export const newsRegions: Array<{
    value: Region;
    label: string;
    mapImage: string;
}> = [
        {
            value: "all",
            label: "전체",
            mapImage:
                "https://images.unsplash.com/photo-1626695436755-3e288720849c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMG1hcCUyMGdsb2JlfGVufDF8fHx8MTc2MzYxMTk1OHww&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
            value: "africa",
            label: "아프리카",
            mapImage:
                "https://images.unsplash.com/photo-1718206147827-1bb1b0326c38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2ElMjBtYXAlMjBzaWxob3VldHRlfGVufDF8fHx8MTc2MzYyNzY5NHww&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
            value: "southeast-asia",
            label: "동남아시아",
            mapImage:
                "https://images.unsplash.com/photo-1660886023919-307e19c33554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3V0aGVhc3QlMjBhc2lhJTIwbWFwfGVufDF8fHx8MTc2MzYyNzY5NXww&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
            value: "central-asia",
            label: "중앙아시아",
            mapImage:
                "https://images.unsplash.com/photo-1733094151451-4222a842cfd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZW50cmFsJTIwYXNpYSUyMG1hcHxlbnwxfHx8fDE3NjM1Njc3MDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
            value: "latin-america",
            label: "라틴아메리카",
            mapImage:
                "https://images.unsplash.com/photo-1544906243-a69767cc000b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXRpbiUyMGFtZXJpY2ElMjBtYXB8ZW58MXx8fHwxNzYzNjI3Njk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
        },
    ];

export const newsSeedData: Record<Region, NewsItem[]> = {
    all: [
        {
            id: 1,
            title: "글로벌 보건 파트너십 강화를 위한 국제 협력 확대",
            summary:
                "세계보건기구(WHO)와 주요 개발협력 기관들이 개발도상국의 보건 시스템 강화를 위한 새로운 협력 프레임워크에 합의했습니다.",
            content:
                "WHO, 세계은행, KOICA를 포함한 주요 국제개발협력 기관들이 참여한 이번 협력 프레임워크는 개발도상국의 보건의료 인프라 강화, 의료인력 양성, 감염병 대응 역량 강화를 목표로 합니다. 특히 한국은 코로나19 대응 경험을 바탕으로 디지털 헬스케어 기술 이전과 지역사회 기반 보건 시스템 구축을 지원할 예정입니다.",
            source: "KOICA 뉴스센터",
            date: "2025.03.15",
        },
        {
            id: 2,
            title: "아프리카 농업 생산성 향상 프로젝트 성과 발표",
            summary:
                "한국의 농업 기술을 활용한 동아프리카 지역 농업 개발 사업이 현지 농민들의 소득 증대에 큰 성과를 거두고 있습니다.",
            content:
                "케냐, 탄자니아, 우간다 3개국에서 진행된 농업 생산성 향상 프로젝트가 2년간의 사업 기간 동안 참여 농가의 평균 소득을 45% 증가시키는 성과를 달성했습니다. 한국의 시설농업 기술과 스마트팜 솔루션을 현지 환경에 맞게 적용하여 물 사용량은 30% 감소시키면서도 생산량은 60% 증가했습니다.",
            source: "국제개발협력 저널",
            date: "2025.03.12",
        },
        {
            id: 3,
            title: "동남아시아 디지털 전환 지원 사업 착수",
            summary:
                "KOICA가 동남아시아 국가들의 디지털 인프라 구축 및 ICT 역량 강화를 위한 대규모 지원 사업을 시작합니다.",
            content:
                "베트남, 인도네시아, 필리핀을 대상으로 5년간 진행될 이번 사업은 공공행정 디지털화, 중소기업 디지털 전환 지원, ICT 인재 양성을 중점적으로 추진합니다. 특히 한국의 전자정부 구축 경험과 K-디지털 트레이닝 프로그램을 현지에 전수하여 디지털 격차 해소에 기여할 계획입니다.",
            source: "KOICA 공식 보도자료",
            date: "2025.03.10",
        },
        {
            id: 4,
            title: "라틴아메리카 교육 격차 해소를 위한 새로운 이니셔티브",
            summary:
                "중남미 지역 소외계층 아동 및 청소년들의 교육 접근성 향상을 위한 한국-라틴아메리카 교육 협력 프로그램이 론칭됩니다.",
            content:
                "페루, 볼리비아, 파라과이 3개국의 농촌 및 산간 지역 학생 1만 명을 대상으로 디지털 교육 플랫폼 구축과 교육 콘텐츠 제공, 교사 역량 강화 프로그램을 통합적으로 지원합니다. 한국의 EBS 온라인 교육 시스템을 벤치마킹하여 현지어로 제작된 교육 콘텐츠를 무상으로 제공할 예정입니다.",
            source: "글로벌 개발 리포트",
            date: "2025.03.08",
        },
    ],
    africa: [
        {
            id: 7,
            title: "아프리카 농업 생산성 향상 프로젝트 성과 발표",
            summary:
                "한국의 농업 기술을 활용한 동아프리카 지역 농업 개발 사업이 현지 농민들의 소득 증대에 큰 성과를 거두고 있습니다.",
            content:
                "케냐, 탄자니아, 우간다 3개국에서 진행된 농업 생산성 향상 프로젝트가 2년간의 사업 기간 동안 참여 농가의 평균 소득을 45% 증가시키는 성과를 달성했습니다.",
            source: "국제개발협력 저널",
            date: "2025.03.12",
        },
        {
            id: 8,
            title: "사하라 이남 아프리카 식수 공급 프로젝트 확대",
            summary:
                "깨끗한 물 접근성 개선을 위한 식수 인프라 구축 사업이 10개국으로 확대되어 추진됩니다.",
            content:
                "세네갈, 말리, 니제르 등 10개국에서 식수 인프라를 구축하여 약 50만 명의 주민들에게 안전한 식수를 공급합니다.",
            source: "KOICA 공식 보도자료",
            date: "2025.03.07",
        },
        {
            id: 9,
            title: "서아프리카 보건의료 인력 양성 사업 성과",
            summary:
                "현지 의료진 교육 프로그램을 통해 3,000명 이상의 보건인력이 배출되어 지역 의료 서비스 질이 향상되었습니다.",
            content:
                "가나, 라이베리아, 시에라리온에서 간호사, 조산사, 지역보건요원 양성 프로그램을 운영하여 모자보건 지표가 크게 개선되었습니다.",
            source: "국제보건협력 뉴스",
            date: "2025.03.01",
        },
    ],
    "southeast-asia": [
        {
            id: 10,
            title: "동남아시아 디지털 전환 지원 사업 착수",
            summary:
                "KOICA가 동남아시아 국가들의 디지털 인프라 구축 및 ICT 역량 강화를 위한 대규모 지원 사업을 시작합니다.",
            content:
                "베트남, 인도네시아, 필리핀을 대상으로 5년간 진행될 이번 사업은 공공행정 디지털화와 ICT 인재 양성을 중점 추진합니다.",
            source: "KOICA 공식 보도자료",
            date: "2025.03.10",
        },
        {
            id: 11,
            title: "베트남 스마트시티 건설 협력 사업 진행",
            summary:
                "한국의 스마트시티 기술과 경험을 활용하여 베트남 주요 도시의 지속가능한 발전을 지원합니다.",
            content:
                "하노이와 호치민시에 스마트 교통 시스템, IoT 기반 도시 관리 플랫폼을 구축하여 도시 경쟁력을 강화합니다.",
            source: "글로벌 개발 리포트",
            date: "2025.03.06",
        },
        {
            id: 12,
            title: "미얀마 직업훈련센터 설립 지원",
            summary:
                "청년 실업 문제 해결과 산업 인력 양성을 위한 직업교육 인프라 구축이 추진됩니다.",
            content:
                "양곤과 만달레이에 최신 설비를 갖춘 직업훈련센터를 건립하여 연간 2,000명의 기술 인력을 양성합니다.",
            source: "KOICA 뉴스센터",
            date: "2025.02.28",
        },
    ],
    "central-asia": [
        {
            id: 13,
            title: "중앙아시아 에너지 효율화 사업 추진",
            summary:
                "중앙아시아 국가들의 에너지 안보 강화 및 친환경 에너지 전환을 지원하는 새로운 협력 사업이 추진됩니다.",
            content:
                "카자흐스탄, 우즈베키스탄, 투르크메니스탄에서 태양광 및 풍력 발전 시설을 구축하고 에너지 효율 개선 사업을 진행합니다.",
            source: "KOICA 뉴스센터",
            date: "2025.03.05",
        },
        {
            id: 14,
            title: "우즈베키스탄 의료 현대화 프로젝트 성과",
            summary:
                "현대식 의료 장비 지원과 의료진 교육을 통해 지역 보건의료 서비스 수준이 크게 향상되었습니다.",
            content:
                "타슈켄트와 사마르칸트의 주요 병원에 최신 의료 장비를 지원하고 의료진 500명을 한국에서 연수시켰습니다.",
            source: "국제개발협력 저널",
            date: "2025.02.25",
        },
        {
            id: 15,
            title: "키르기스스탄 농촌 개발 사업 확대",
            summary:
                "농촌 지역 인프라 개선 및 농업 생산성 향상을 위한 통합 개발 사업이 전국으로 확대됩니다.",
            content:
                "도로, 관개시설, 농산물 저장시설 등 농촌 인프라를 개선하고 협동조합 설립을 지원하여 농가 소득을 증대시킵니다.",
            source: "KOICA 공식 보도자료",
            date: "2025.02.20",
        },
    ],
    "latin-america": [
        {
            id: 16,
            title: "라틴아메리카 교육 격차 해소를 위한 새로운 이니셔티브",
            summary:
                "중남미 지역 소외계층 아동 및 청소년들의 교육 접근성 향상을 위한 한국-라틴아메리카 교육 협력 프로그램이 론칭됩니다.",
            content:
                "페루, 볼리비아, 파라과이 3개국의 농촌 지역 학생 1만 명을 대상으로 디지털 교육 플랫폼과 콘텐츠를 제공합니다.",
            source: "글로벌 개발 리포트",
            date: "2025.03.08",
        },
        {
            id: 17,
            title: "페루 재생에너지 발전 시설 건설 지원",
            summary:
                "태양광 및 풍력 발전 인프라 구축을 통해 페루의 탄소 중립 목표 달성을 지원합니다.",
            content:
                "안데스 산맥 지역에 태양광 발전소를 건설하고 해안 지역에 풍력 발전 단지를 조성하여 청정에너지 공급을 확대합니다.",
            source: "KOICA 뉴스센터",
            date: "2025.03.02",
        },
        {
            id: 18,
            title: "콜롬비아 평화 정착 지원 사업 진행",
            summary:
                "분쟁 후 재건 및 지역 공동체 회복을 위한 평화 구축 프로젝트가 성공적으로 진행되고 있습니다.",
            content:
                "분쟁 피해 지역의 사회경제적 재건을 위해 직업훈련, 소득 창출, 트라우마 치유 프로그램을 통합적으로 지원합니다.",
            source: "국제개발협력 저널",
            date: "2025.02.27",
        },
    ],
};

