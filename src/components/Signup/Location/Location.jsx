import React, { useState } from 'react';
import { NavigateButton, SelectSquareButton } from '../../Button/Button';
import Wrapper from '../../Wrapper';
import * as S from './Location.style';
import { useLocation, useNavigate } from 'react-router-dom';

const SEOUL_DETAIL_LIST = [
	{ id: '1', cityDetailName: '종로·용산·중구' },
	{ id: '2', cityDetailName: '양천·강서구' },
	{ id: '3', cityDetailName: '동대문·성동·광진·중랑구' },
	{ id: '4', cityDetailName: '은평·서대문·마포구' },
	{ id: '5', cityDetailName: '서초·강남구' },
	{ id: '6', cityDetailName: '동작·관악구' },
	{ id: '7', cityDetailName: '구로·금천·영등포구' },
	{ id: '8', cityDetailName: '성북·강북·도봉·노원구' },
	{ id: '9', cityDetailName: '송파·강동구' },
];

const CAPITAL_AREA_DETAIL_LIST = [
	{ id: '11', cityDetailName: '인천' },
	{ id: '12', cityDetailName: '경기 중부' },
	{ id: '13', cityDetailName: '경기 북부' },
	{ id: '14', cityDetailName: '경기 남부' },
	{ id: '15', cityDetailName: '경기 동부' },
	{ id: '16', cityDetailName: '경기 서부' },
];

const TOWNINFOTETXT = (
	<span>
		경기중부: 과천시·군포시·성남시·수원시·안양시·의왕시 <br />
		경기북부: 가평군·고양시·구리시·남양주시·동두천시·양주시· <br />
		&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;연천군·의정부시·파주시·포천시
		<br />
		경기남부: 안성시·오산시·용인시·평택시·화성시 <br />
		경기동부: 광주시·양평군·여주군·이천시·하남시
		<br />
		경기서부: 광명시·김포시·부천시·시흥시·안산시
	</span>
);

const Location = () => {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState(false);
	const [basicInfo, setBasicInfo] = useState(JSON.parse(localStorage?.getItem('basicInfo')) || {});

	const handlePrevBtn = () => {
		localStorage.setItem(
			'basicInfo',
			JSON.stringify({
				...basicInfo,
				location: basicInfo.cityDetail,
			}),
		);
		navigate('/basicInfo', { state: { basicInfo } });
	};

	const handleNextBtn = () => {
		if (!basicInfo.cityDetail) {
			setErrorMessage(true);
		} else {
			localStorage.setItem(
				'basicInfo',
				JSON.stringify({
					...basicInfo,
					location: basicInfo.cityDetail,
				}),
			);
			navigate('/hobby');
		}
	};
	const cityChange = e => {
		setBasicInfo({
			...basicInfo,
			[e.target.name]: e.target.value,
		});
	};
	return (
		<Wrapper titleMessage={'거주 지역이 어디인가요?'}>
			{errorMessage && <S.ErrorMessage>지역을 선택해주세요</S.ErrorMessage>}

			<S.CitySelectWrapper>
				<S.CitySelectInput type="radio" id="Seoul" name="city" value="Seoul" onClick={cityChange} />
				<S.CitySelectLabel htmlFor="Seoul" focused={basicInfo?.city === 'Seoul'}>
					서울
				</S.CitySelectLabel>
				<S.CitySelectInput
					type="radio"
					id="CapitalArea"
					name="city"
					value="CapitalArea"
					onClick={cityChange}
				/>
				<S.CitySelectLabel htmlFor="CapitalArea" focused={basicInfo?.city === 'CapitalArea'}>
					경기/인천
				</S.CitySelectLabel>
			</S.CitySelectWrapper>
			{basicInfo.city === 'Seoul' && (
				<S.TownSelectWrapper wrapperWidth={'39rem'} wrapperHeight={'50rem'}>
					{SEOUL_DETAIL_LIST.map(city => (
						<div key={city.id}>
							<S.TownSelectInput
								type="radio"
								id={city.id}
								name="cityDetail"
								value={city.id}
								onClick={cityChange}
							></S.TownSelectInput>
							<S.TownSelectLabel htmlFor={city.id} focused={basicInfo?.cityDetail === city.id}>
								{city.cityDetailName}
							</S.TownSelectLabel>
						</div>
					))}
				</S.TownSelectWrapper>
			)}
			{basicInfo.city === 'CapitalArea' && (
				<S.TownSelectWrapper wrapperWidth={'30rem'} wrapperHeight={'30rem'}>
					{CAPITAL_AREA_DETAIL_LIST.map(city => (
						<div key={city.id}>
							<S.TownSelectInput
								type="radio"
								id={city.id}
								name="cityDetail"
								value={city.id}
								onClick={cityChange}
							></S.TownSelectInput>
							<S.TownSelectLabel htmlFor={city.id} focused={basicInfo?.cityDetail === city.id}>
								{city.cityDetailName}
							</S.TownSelectLabel>
						</div>
					))}
					<S.TownInfoText>{TOWNINFOTETXT}</S.TownInfoText>
				</S.TownSelectWrapper>
			)}

			<NavigateButton handlePrevBtn={handlePrevBtn} handleNextBtn={handleNextBtn}></NavigateButton>
		</Wrapper>
	);
};

export default Location;
