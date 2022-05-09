// Importing modules
import React, { useState, useEffect } from "react";
import { Row,Card } from "reactstrap";
import {WEATHER_API} from '../../backend';

import ThreeDotsWave from '../animation/ThreeDotsWave';

import { getTimestampWeekDay,getByTimestamp } from "./utils/timestampUtils";

import Topbar from "../topbar/topbar";
import moment from 'moment';
import 'moment-timezone';

import 'swiper/css';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';

import './weatherForecast.css';

import { Keyboard, Pagination, Navigation } from "swiper";

import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import {
	Box, Flex, Grid, GridItem, Container, Heading, Icon, IconButton, Image, Menu,
	MenuButton, MenuItem, MenuList, Text, Tooltip,
	useColorMode, useDisclosure, useToast
} from '@chakra-ui/react';

var weatherData;

function WeatherData() {
    const [isLoading, setLoading] = useState(true);

    const [slidesPerView, setSlidesPerView] = useState(4);

    const [display,setDisplay] = useState(false);

    const setWthrData = (data) => {
        weatherData = data;
        // console.log("Weather Data",weatherData)
        setDisplay(true);
    }

    useEffect(() => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }

        var latitude;
        var longitude;

        function showPosition(position) {
            // console.log("latitude",position.coords.latitude);
            // console.log("longitude",position.coords.longitude);

            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            const WthData = async() => {
                await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly&units=metric&appid=${WEATHER_API}`, {
                    method: 'GET'
                  }).then(res => res.json())
                  .then((data) => {
                        setWthrData(data);
                  })
                  .catch(console.log)
                }
            WthData();
        }
        // console.log("weatherData",weatherData);

        const handleScreenResize = () => {
			if (window.innerWidth < 768) {
				setSlidesPerView(1);
			} else if (window.innerWidth < 1024) {
				setSlidesPerView(3);
			} else {
				setSlidesPerView(4);
			}
		};

		window.addEventListener('resize', handleScreenResize);
		handleScreenResize();

        setLoading(false);

        // console.log("we",weatherData);

		return () => window.removeEventListener('resize', handleScreenResize);
    }, [weatherData]);

    if (isLoading) {
        return <ThreeDotsWave />
    }

      const DailyCard = (weather) => {

        // console.log("Weeee",weatherData);
        return (
            <Box maxW='sm' borderWidth='1px' overflow='hidden' borderRadius={'10px'} marginTop={4}>
            <Box p='6' backgroundImage={'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80'}>
                <Box
                    position={'relative'}
                    as={Flex}
                    alignItems={'center'}
                    justifyContent={'center'}
                    flexDir={'column'}
                    paddingX={10}
                    paddingY={6}
                    color={'white'}
                    textAlign={'center'}
                >
                    <Heading as={'h4'} fontSize={'xs'} fontWeight={'bold'}>
                        {getTimestampWeekDay(weather?.dt)}
                    </Heading>
                    <Text>{getByTimestamp(weather.dt)}</Text>

                    {weather.weather[0] && (
                        <Tooltip hasArrow label={weather.weather[0].main} placement={'top'}>
                            <Image
                                width={'80px'}
                                filter={'drop-shadow(0 0 4px white)'}
                                src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                                alt={weather?.weather[0].description}
                            />
                        </Tooltip>
                    )}
                    <Flex
                            justifyContent={'center'}
                            flexWrap={'wrap'}
                            gap={[0, 0, 3]}
                            padding={2}
                            w={'100%'}
                            marginTop={4}
                            borderRadius={'10px'}
                            backgroundColor={'whiteAlpha.500'}
                            sx={{
                                '& *': {
                                    textAlign: 'center',
                                    flex: ['0 1 50%', '0 1 50%', 'auto']
                                }
                            }}
                        >
                            <Box>
                                <Text fontSize={'sm'}>Temperature(Min/Max)</Text>
                                <Text fontWeight={'bold'}>{Math.round(weather.temp.min)} ºC / {Math.round(weather.temp.max)} ºC</Text>
                            </Box>
                            <Box>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cloud-rain" viewBox="0 0 16 16">
                            <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 0 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z"/>
                            </svg>
                                <Text fontSize={'sm'}><i class="bi bi-cloud-rain"></i></Text>
                                <Text fontWeight={'bold'}>{weather.rain ? weather.rain : 0} mm</Text>
                            </Box>
                            <Box>
                                <Text fontSize={'sm'}>Humidity</Text>
                                <Text fontWeight={'bold'}>{Math.round(weather.humidity)}%</Text>
                            </Box>
                        </Flex>
                </Box>
            </Box>
            </Box>
        )
      }

    return (
    <>
    <Topbar />

    <h1 align="center">Weather Forecast</h1>

    {display ? <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={0}
        navigation
        modules={[Navigation]}
        className="mySwiper"
        grabCursor
    >
        <SwiperSlide>
            {DailyCard(weatherData.daily[0])}
        </SwiperSlide>
        <SwiperSlide>
            {DailyCard(weatherData.daily[1])}
        </SwiperSlide>
        <SwiperSlide>
            {DailyCard(weatherData.daily[2])}
        </SwiperSlide>
        <SwiperSlide>
            {DailyCard(weatherData.daily[3])}
        </SwiperSlide>
        <SwiperSlide>
            {DailyCard(weatherData.daily[4])}
        </SwiperSlide>
        <SwiperSlide>
            {DailyCard(weatherData.daily[5])}
        </SwiperSlide>
        <SwiperSlide>
            {DailyCard(weatherData.daily[6])}
        </SwiperSlide>
        <SwiperSlide>
            {DailyCard(weatherData.daily[7])}
        </SwiperSlide>
      </Swiper> : null}
    </>
    );
}

export default WeatherData;
