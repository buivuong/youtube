<!DOCTYPE html>
<html>
<head>
	<title>Newdaikin</title>
	<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<style type="text/css">
		ul{
			list-style: none;
		}
		.video-list-thumbs{}
.video-list-thumbs > li{
    margin-bottom:12px
}
.video-list-thumbs > li:last-child{}
.video-list-thumbs > li > a{
	display:block;
	position:relative;
	background-color: #212121;
	color: #fff;
	padding: 0px;
}
.video-list-thumbs > li > a:hover{
	background-color:#000;
	transition:all 500ms ease;
	box-shadow:0 2px 4px rgba(0,0,0,.3);
	text-decoration:none
}


.video-list-thumbs li h2{
	font-size: 13px;
    padding-bottom: 4px !important;
    text-align: center;
	margin: 5px 2px 3px 0;
    line-height:18px;
    overflow:hidden;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-flex:1;
    -webkit-box-orient:vertical
}
.video-list-thumbs .fa-play-circle-o{
    font-size: 60px;
    opacity: 0.2;
    position: absolute;
    right: 39%;
    top: 31%;
    text-shadow: 0 1px 3px rgba(0,0,0,.5);
}
.video-list-thumbs > li > a:hover .fa-play-circle-o{
	color:#fff;
	opacity:1;
	text-shadow:0 1px 3px rgba(0,0,0,.8);
	transition:all 500ms ease;
}

.video-list-thumbs .time{
    background-color: rgba(0, 200, 240, 0.8);
	color: #fff;
	font-size: 11px;
	font-weight: bold;
	right: 0;
	line-height: 13px;
	padding: 4px;
	position: absolute;
	bottom: 44px;
}

.video-list-thumbs .duration{
	background-color: rgba(0, 0, 0, 0.6);
	border-radius: 2px;
	color: #fff;
	font-size: 11px;
	font-weight: bold;
	left: 8px;
	line-height: 13px;
	padding: 4px;
	position: absolute;
	top: 8px;
}
.video-list-thumbs > li > a:hover .duration{
	background: rgba(184, 44, 44, 0.9);
	transition:all 500ms ease;
}
@media (min-width:320px) and (max-width: 480px) { 
	.video-list-thumbs .fa-play-circle-o{
    font-size: 35px;
    right: 36%;
    top: 27%;
	}
	.video-list-thumbs h2{
		bottom: 0;
        padding: 3px;
		font-size: 12px;
		height: 22px;
		margin: 8px 0 0;
	}
}
	</style>
</head>
<body>
	<div id="app"></div>
	<div id="modal"></div>
	<script
  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
  <script src="https://apis.google.com/js/client.js?onload=googleApiClientReady">  </script>
	<script type="text/javascript" src="modules/is.js/is.min.js"></script>
	<script type="text/javascript" src="vendor/react.bundle.js"></script>
	<script type="text/javascript" src="vendor/router.bundle.js"></script>
	<script type="text/javascript" src="vendor/immutable.bundle.js"></script>
	<script type="text/javascript" src="vendor/ajax.bundle.js"></script>
	<script type="text/javascript" src="build/bootstrap.js"></script>
</body>
</html>
