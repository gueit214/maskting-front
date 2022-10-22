import React, { useState } from 'react';
import { NavigateButton, SelectSquareButton } from '../../Button/Button';
import Wrapper from '../../Wrapper';
import * as S from './Location.style';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SEOUL_DETAIL_LIST = [
	{ id: 'cityDetail2', cityDetailName: '종로·용산·중구' },
	{ id: 'cityDetail3', cityDetailName: '양천·강서구' },
	{ id: 'cityDetail4', cityDetailName: '동대문·성동·광진·중랑구' },
	{ id: 'cityDetail5', cityDetailName: '은평·서대문·마포구' },
	{ id: 'cityDetail6', cityDetailName: '서초·강남구' },
	{ id: 'cityDetail7', cityDetailName: '동작·관악구' },
	{ id: 'cityDetail8', cityDetailName: '구로·금천·영등포구' },
	{ id: 'cityDetail9', cityDetailName: '성북·강북·도봉·노원구' },
	{ id: 'cityDetail10', cityDetailName: '송파·강동구' },
];

const CAPITAL_AREA_DETAIL_LIST = [
	{ id: 'cityDetail11', cityDetailName: '인천' },
	{ id: 'cityDetail12', cityDetailName: '경기 중부' },
	{ id: 'cityDetail13', cityDetailName: '경기 북부' },
	{ id: 'cityDetail14', cityDetailName: '경기 남부' },
	{ id: 'cityDetail15', cityDetailName: '경기 동부' },
	{ id: 'cityDetail16', cityDetailName: '경기 서부' },
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
	const location = useLocation();
	const [errorMessage, setErrorMessage] = useState(false);
	const [basicInfo, setBasicInfo] = useState(JSON.parse(localStorage.getItem('basicInfo')));
	const [radio, setRadio] = useState({ city: null, cityDetail: null });

	useEffect(() => {
		if (location?.state?.basicInfo) setBasicInfo(location?.state?.basicInfo);
		setBasicInfo(JSON.parse(localStorage.getItem('basicInfo')));
	}, []);
	console.log(basicInfo);

	const handlePrevBtn = () => {
		// localStorage.setItem(
		// 	'basicInfo',
		// 	JSON.stringify({
		// 		...basicInfo,
		// 		location: radio.cityDetail,
		// 	}),
		// );
		navigate('/basicInfo', { state: { basicInfo } });
	};

	const handleNextBtn = () => {
		if (!radio.cityDetail) {
			setErrorMessage(true);
		} else {
			localStorage.setItem(
				'basicInfo',
				JSON.stringify({
					...basicInfo,
					location: radio.cityDetail,
				}),
			);
			navigate('/hobby');
		}
	};
	const cityChange = e => {
		setRadio({
			...radio,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<Wrapper titleMessage={'거주 지역이 어디인가요?'}>
			{errorMessage && <S.ErrorMessage>지역을 선택해주세요</S.ErrorMessage>}

			<S.CitySelectWrapper>
				<S.CitySelectInput type="radio" id="Seoul" name="city" value="Seoul" onClick={cityChange} />
				<S.CitySelectLabel htmlFor="Seoul" focused={radio.city === 'Seoul'}>
					서울
				</S.CitySelectLabel>
				<S.CitySelectInput
					type="radio"
					id="CapitalArea"
					name="city"
					value="CapitalArea"
					onClick={cityChange}
				/>
				<S.CitySelectLabel htmlFor="CapitalArea" focused={radio.city === 'CapitalArea'}>
					경기/인천
				</S.CitySelectLabel>
			</S.CitySelectWrapper>
			{radio.city === 'Seoul' && (
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
							<S.TownSelectLabel htmlFor={city.id} focused={radio.cityDetail === city.id}>
								{city.cityDetailName}
							</S.TownSelectLabel>
						</div>
					))}
				</S.TownSelectWrapper>
			)}
			{radio.city === 'CapitalArea' && (
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
							<S.TownSelectLabel htmlFor={city.id} focused={radio.cityDetail === city.id}>
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
