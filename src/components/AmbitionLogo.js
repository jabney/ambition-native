import React from 'react'
import { StyleSheet, Animated } from 'react-native'
import Svg, { Path } from 'react-native-svg'

import { interpolate, combine, separate, splitPathString } from 'flubber/index'

const groups = [
  {
    orchid: 'M315.606,261c-1.105-4.009-2.206-8.175-3.308-12.624-9.178-13.6-13.806-23.029-13.806-28.237q0-6.324,5.3-13.36c6.8,15.828,17.457,40.753,29.561,69.389-1.048-.447-2.154-0.9-3.372-1.369C322.25,272.4,317.456,267.816,315.606,261Zm25.625,97.08H330.394q-6.2-34.764-16.917-53.616-21.669-38.057-33.878-50.71c-2.021-2.059-3.907-3.957-5.681-5.718l3.229-7.481q9.92,3.658,18.875,14.926,2.132,1.725,20.1,29.378A163.549,163.549,0,0,1,338.353,339C339.283,345.331,340.263,351.711,341.231,358.079ZM360.4,342.952q3.046,7.368,6.042,14.664H356.9c0.519-2.154,1.041-4.358,1.569-6.649Q359.424,346.806,360.4,342.952ZM252.116,301.635q24.169,5.637,41.757,40.291,3.831,7.427,7.183,15.69h-72.97C235.976,339.187,244.168,320.111,252.116,301.635Z',
    butterfly: 'M228.413,358.219h58.362c0.367-27.341-.233-50.818,1.9-51.629,4.6-1.748,3.55,35.494,6.618,44.238,1.6,4.566,2.647,6.538,3.286,7.391h2.532c0.623-.749,1.706-2.673,3.42-7.563,3.068-8.741,2.019-45.974,6.618-44.226,2.137,0.812,1.53,24.381,1.9,51.789h53.271c-18.458-44.934-38.834-92.981-52.476-124.911-3.656,7.455-5.763,11.923-5.763,11.923s-5.306,1.9-1.919-6.559c3.031-7.553,1.089-11.186-1.365-12.972,0,0,.536-3.876,1.55-9.9l-1.221-2.844c-1.178,7.277-1.76,12.12-1.691,11.944a7.439,7.439,0,0,0-3.525-1.086v0.139a7.425,7.425,0,0,0-3.524,1.087c0.087,0.222-.869-7.6-2.76-18.241q-0.588,1.361-1.247,2.882c1.722,9.485,2.644,16.161,2.644,16.161-2.454,1.786-4.4,5.42-1.365,12.975,3.387,8.457-1.919,6.561-1.919,6.561s-2.912-6.177-7.825-16.115C270.062,261.324,248.21,311.979,228.413,358.219Z',
  },
  {
    orchid: 'M444.4,196.835c4.23,5.413,8.378,10.493,12.422,15.3l-1.658,1.2q-13.262,0-32.562-18.044c-4.051-1.2-6.089-2-6.089-2.408,4.8-2.766,8.663-4.2,11.617-4.2A19.761,19.761,0,0,1,444.4,196.835Zm1.923-64.02q-2.713-1.2-8.26-.6Q428.686,133.421,422.6,122a43.619,43.619,0,0,1-4.978-20.416l1.1-2.413,8.295,1.81q7.734,0,7.739,1.8a29.946,29.946,0,0,1-1.381,6.612A29.322,29.322,0,0,0,432,116.576c0,5.614,1.936,9.159,5.8,10.556a114.36,114.36,0,0,1,10.742,4.482l-0.555.6ZM394.676,40.631c-7.01,0-10.5-3.779-10.5-11.395,0-6.777,2.757-10.189,8.286-10.189,8.1,0,12.127,3.973,12.127,12C404.593,37.456,401.311,40.631,394.676,40.631Zm-41.3,16.474L352.819,55.3q6.628-21.036,27.6-21.046a7.121,7.121,0,0,0,2.212.6c-4.795,3.611-8.85,5.812-12.132,6.613Q360.006,50.5,353.373,57.105Zm-24.121,42.33c-1.664-4-2.975-7.152-3.89-9.353a183.288,183.288,0,0,0,3.064-36.172q0-12.615-6.635-28.227l1.12-1.808c2.574,0.406,5.239,4.42,8,12q4.161,11.432,4.156,16.841C335.064,68.375,333.779,83.945,329.252,99.435Zm27.215-60.664c0,6.126-2.676,9.348-7.732,9.97v0.992c-0.185-.354-0.243-0.586-0.417-0.926A11.942,11.942,0,0,1,347.07,49q-12.659,0-12.67-11.431,0-10.826,10.463-10.821c0.283,0,.469.1,0.741,0.11,0.4-2.091.867-4.323,1.466-6.867a165.777,165.777,0,0,0,3.313-16.5c2.946,0,4.423,2.806,4.423,8.389q0,6-3.033,16.535c-0.021.074-.026,0.124-0.047,0.2C354.765,30.486,356.467,33.748,356.467,38.771Zm66.686,54.991a45.815,45.815,0,0,0-8.289-1.206c-3.317,0-7.256-.194-11.857,3.415s-9.116,5.41-13.527,5.41q-5.538,0-15.2-3.908c-6.415-2.607-11.663-1.911-15.711-1.911q-13.263,0-19.872,6.617v-1.2c0-8.789,4.336-17.341,12.954-25.561q12.986-12.277,25.111-12.3,4.97,0,12.717,3.605c5.139,2.411,8.278,3.612,9.388,3.612q11.046,0,17.642,3.609c1.849,1.2,4.8,4.111,8.85,8.687,4.048,4.616,6.08,7.955,6.08,9.924v1.206A25.872,25.872,0,0,1,423.153,93.762Zm-30.672,19.362q15.934,8.239,31.111,23.9,27.636,28.262,43.069,67.3l-0.555,1.2q-8.842-8.429-17.691-16.844-11.559-11.381-19.85-11.4-8.292,0-22.9,6.02c-9.759,4.009-17.4,5.976-22.922,5.976A53.329,53.329,0,0,1,366.948,187c-1.786-4.29-29.4-69.733-29.459-71.017C336.793,99.506,369.85,101.419,392.481,113.123Z',
    butterfly: 'M509.592,41.177a233.02,233.02,0,0,1,25.337-.67c-0.884,1.323-1.485,2.1-1.485,2.1s11.46,11.005,10.927,24.828C543.82,81.724,530.133,92.49,530.133,92.49s11.7,15.257,8.278,30.564c-3.829,17.133-24.835,20.855-24.835,20.855s9.964,20.5,5.96,36.745c-3.3,13.4-19.967,18.861-25.792,20.38a319.611,319.611,0,0,0-44.737-14.421,296.9,296.9,0,0,1,43.363,16.5c3.387,8.8,17.61,51.586-18.529,68.907-18.241,8.748-44.933,10.383-68.139,9.653-18.626-44.2-37.017-88.12-51.545-122.9,16.748-30.074,35.916-61.309,52.134-79.415C445.24,35.87,508.255-26.169,539.4,11.824c6.414,7.823.969,19.722-2.9,26.2C522.621,38.914,509.592,41.177,509.592,41.177Z',
  },
  {
    orchid: 'M184.065,184.71c6.454,1.175,9.859,2.208,10.187,2.978l-2.2,3.607q-17.626,12.03-18.2,13.237-4.418,7.215-20.964,21.046-14.374,12.636-15.475,15.031a56.949,56.949,0,0,1-9.947,20.417c-1.434,1.6-6.32,4.781-14.605,9.594s-13.172,7.216-14.641,7.216l-1.1-.6c8.1-10.427,12.158-18.414,12.158-24.022q0-25.209,11.039-32.447a54.955,54.955,0,0,0,6.049-4.81,109.876,109.876,0,0,0,3.872-14.432q8.836-18.592,41.4-18.612Q174.4,182.909,184.065,184.71Zm48.842-96.123q3.316,1.807,14.365,16.812c8.112,7.616,14.177,12.792,18.207,15.6-3.654,2.4-14.523,7.553-32.572,15.335q-27.015,11.724-29.25,11.727c-4.414,0-9.117-2-14.064-6.02q-7.453-6.006-9.111-6.011-7.743,0-22.652-13.828c-3.65,0-8.08,5.2-13.228,15.629q4.4-25.856,11.6-33.04c2.578-2.8,8.072-4.812,16.545-6.016a36.4,36.4,0,0,0,21.507-10.788q4.989-5.418,17.691-5.413Q225.749,82.576,232.907,88.587Zm85.047-4.163H305.96s-5.128,14.21-13.634,34.364c-4.683-.083-9.729-1.944-15.132-5.668q-8.3-5.708-15.471-10.522-14.316-7.819-18.2-25.227c-3.684-15.64-6.083-24.12-7.184-25.558-1.111-1.37-3.685-4.31-7.736-8.728-4.03-4.406-6.6-8.178-7.7-11.388-3.693-11.227-9.21-18.609-16.582-22.219,3.308-1.2,4.79-1.8,4.419-1.8,2.582,0,5.519,1.2,8.849,3.61,3.314,2.377,5.887,3.578,7.73,3.578,5.494,0,10.835,2.033,15.991,6.013q7.737,6.016,11.044,6.009a13.69,13.69,0,0,0,4.982-1.5,13.519,13.519,0,0,1,4.933-1.512q8.294,0,14.926,9.591,6.628,9.633,9.942,9.618c10.731,0,21.929,3.174,25.7,9.415,5.673,1.136,10.665,4.678,10.665,10.905C323.505,66.337,320.648,76.75,317.954,84.424ZM186.117,230.6l-7.73,12.588v-2.968c0.734-6.822,1.1-12.019,1.1-15.635q1.656-6.007,11.322-21.317c6.42-10.221,11.114-15.974,14.059-17.177q6.091-2.349,22.35-23.985,16.3-21.654,29-22.851c8.48-.808,13.418-1.207,14.886-1.207a46.8,46.8,0,0,1,12.39,1.637c-8.589,20.315-19.1,45.123-30.561,72.058-1.816.128-3.66,0.212-5.555,0.212-5.149,0-9.675,2.107-13.534,6.317s-8.357,6.313-13.5,6.313q-3.317,0-9.4-2.409c-4.051-1.6-7-2.406-8.842-2.406C195.841,219.769,190.536,223.38,186.117,230.6ZM212.606,30.076c-2.574,4.011-3.867,7.417-3.867,10.19q0,6.016,3.867,15.031l-1.1.6q-13.812-12.022-13.81-30.635a17.744,17.744,0,0,1,1.656-8.415C202.3,16.476,206.71,20.85,212.606,30.076Z',
    butterfly: 'M126.159,272.185c-36.139-17.326-21.916-60.124-18.529-68.925a296.94,296.94,0,0,1,43.363-16.5,319.562,319.562,0,0,0-44.737,14.424c-5.825-1.519-22.488-6.98-25.792-20.384-4-16.245,5.96-36.755,5.96-36.755s-21.006-3.723-24.834-20.861c-3.42-15.311,8.278-30.572,8.278-30.572S56.18,81.838,55.629,67.55C55.1,53.723,66.556,42.715,66.556,42.715s-0.6-.78-1.485-2.1a232.924,232.924,0,0,1,25.337.67S77.379,39.017,63.5,38.124c-3.873-6.476-9.318-18.378-2.9-26.2,31.149-38,94.164,24.052,133.113,67.55,22.093,24.671,49.657,73.7,69.123,110.984-11.645,27.426-24.722,58.121-38.017,89.131C199.672,282.442,153.454,285.279,126.159,272.185Z',
  },
  {
    orchid: 'M168.874,359.35q1.1-8.418,2.49-17.449c0.919-5.975,2.759-10.883,5.529-14.689a19.1,19.1,0,0,1,11.589-7.477c4.948-1.208,9.869-2.208,14.619-3.007a46.3,46.3,0,0,0,8.328-3.684c-10.484,24.33-20.828,48.186-30.438,70.12q-10.55,2.138-21.5,17.655-11,15.628-12.674,30.025l-1.669,1.21-2.2-13.823v-2.987q0-22.848,11.589-36.656Q167.758,362.361,168.874,359.35Z',
    butterfly: 'M134.745,327.648c-0.609-17.3,57.94-36.474,88.929-45.4-27.7,64.591-56.185,130.147-74.474,169.945C146.109,416.985,135.117,338.29,134.745,327.648Z',
  },
  {
    orchid: 'M250.322,385.43q-6.609,15.334-19.044,15.354-7.825,0-19.551-5.9c1.324-3.106,2.673-6.268,4.035-9.457h34.56Z',
    butterfly: 'M152.835,530.464h54.944c-23.675,52.657-84,77.253-101.973,66.19C136.826,586.882,148.65,558.506,152.835,530.464Zm25.714-56.628c1.807-5.071,17.407-42.834,36.993-88.709h67.992c-0.985,26.237-3.561,51.881-10.614,62.285-20.078-56.678-26.04,22.862-29.255,41.523-1.01,12.47-7.013,47.58-16.888,31.587l-0.993-7.945s-3.476.044-5.922-.043c-1.191-3.537-1.405-8.88-2.621-14.162-0.814,4.379-2.893,9.6-4.2,13.679C196.879,510.341,168.132,503.058,178.549,473.836Z',
  },
  {
    orchid: 'M297.185,517.366a280.53,280.53,0,0,0,2.766-42.04q0-23.451-9.943-61.309Q285.2,396.2,279.959,385.43h23.747a322.848,322.848,0,0,1,7.822,32.794q4.968,43.266,6.065,65.483a121.7,121.7,0,0,0,19.868-74.5,5.259,5.259,0,0,0-.547-2.4c-0.653-7.483-1.414-14.583-2.263-21.377h11.406c0.994,6.314,1.975,12.614,3,18.959a135.182,135.182,0,0,0,6.971-18.959h13.294q-15.366,36.1-33.521,95.278-6.018,20.992-19.862,43.858-4.413,7.239-26.489,39.074-2.209-1.211-2.211-3.014,0-7.807,4.423-21.616Q296.626,522.172,297.185,517.366Z',
    butterfly: 'M494.194,596.406c-17.946,11.044-78.119-13.458-101.866-65.942H447.2C451.414,558.424,463.259,586.664,494.194,596.406ZM378.643,385.122c19.692,48.515,34.9,89.706,35.77,97.931,2.124,20.043-15.573,26.422-27.766,28.493-1.268-3.991-3.313-9.116-4.108-13.391-1.222,5.308-1.443,10.67-2.64,14.216-2.961.225-6.847,0.192-6.847,0.2l-0.993,9.111c-9.436,12.378-14.966-20.9-15.944-32.964-3.216-18.656-9.178-98.175-29.255-41.512-7.037-10.377-9.618-35.919-10.608-62.086h62.391Z',
  },
  {
    orchid: 'M557.4,226.784a16.812,16.812,0,0,0-9.907-3.615,12.152,12.152,0,0,0-2.492.6,11.345,11.345,0,0,1-2.482.6,32.153,32.153,0,0,0-15.466,6.279,36.718,36.718,0,0,0-10.506,12.932q-3.828,7.818-7.7,15.342c-2.575,5.011-7.831,10.687-15.742,17.1s-13.145,11.63-15.72,15.643q-12.717,18.654-31.5,24.061-11.671,3.162-23.691,6.337c-6.49-15.329-13.093-30.969-19.65-46.535,0.533-1.266,1.012-2.509,1.409-3.718q10.5-30.615,42.479-30.606a208.845,208.845,0,0,0,30.949-2.4q9.906-1.2,29.255-13.234,17.679-10.226,29.251-10.225c11.79,0,19.5,3.813,23.175,11.431H557.4Z',
    butterfly: 'M465.255,327.469c-0.235,6.734-4.725,40.72-8.773,73.69-13.7-31.816-29.828-69.821-46.022-108.2C437.9,302.7,465.675,315.532,465.255,327.469Z',
  },
]

const group0interpolator = combine(splitPathString(groups[0].orchid), groups[0].butterfly, { single: true, maxSegmentLength: 5 })
const group1interpolator = combine(splitPathString(groups[1].orchid), groups[1].butterfly, { single: true, maxSegmentLength: 5 })
const group2interpolator = combine(splitPathString(groups[2].orchid), groups[2].butterfly, { single: true, maxSegmentLength: 10 })
const group3interpolator = interpolate(groups[3].orchid, groups[3].butterfly, { maxSegmentLength: 10 })
const group4interpolator = separate(groups[4].orchid, splitPathString(groups[4].butterfly), { single: true, maxSegmentLength: 10 })
const group5interpolator = separate(groups[5].orchid, splitPathString(groups[5].butterfly), { single: true, maxSegmentLength: 10 })
const group6interpolator = interpolate(groups[6].orchid, groups[6].butterfly, { maxSegmentLength: 10 })

const ambitionPath = 'M375.5,526.49V515.563c0-.047,43.718.933,42.492-30.027-0.344-8.7-16.925-52.018-37.653-103.086H213.775c-20.617,48.289-37.325,87.947-38.941,93.378-12.364,41.566,48.676,39.735,48.676,39.735V526.49H88.411V515.563s30.111-2.1,46.688-26.821C152.981,462.07,309.934,88.411,309.934,88.411h10.927S474.844,459.118,488.742,481.788c22.738,37.091,54.635,33.775,54.635,33.775V526.49H375.5ZM298.013,186.755S257.657,279.928,223.119,360.6h148.29C337.689,278.511,298.013,186.755,298.013,186.755Z'

const AmbitionLogo = ({ value, aColor = '#ddd', color='#eee', style={} }) => (
  <Animated.View style={[StyleSheet.absoluteFill, styles.container, style]}>
    <Svg style={styles.svg} viewBox='0 0 600 600'>
      <Path d={ambitionPath} fill={aColor} />
      <Path d={group0interpolator(value)} fill={color} />
      <Path d={group1interpolator(value)} fill={color} />
      <Path d={group2interpolator(value)} fill={color} />
      <Path d={group3interpolator(value)} fill={color} />
      <Path d={group4interpolator(value)} fill={color} />
      <Path d={group5interpolator(value)} fill={color} />
      <Path d={group6interpolator(value)} fill={color} />
    </Svg>
  </Animated.View>
)

export default AmbitionLogo

const styles = StyleSheet.create({
  container: {},
  svg: {
    width: '100%',
    height: '100%',
  },
})
