# Interface of cameraman

## request
|name|type|required|
|--|--|--|
|id|string|y|
|video_type|VideoType|y|
|scene|List\<Point\>|y|

## VideoType
- YUKKURI
- ZUNDAMON
- RANKING

## Point
|name|type|required|
|--|--|--|
|prompt|string|y|
|images|List\<Image\>|y|

## Image
|name|type|required|
|--|--|--|
|image_id|string|y|
|image_pos|ImagePos|y|

## ImagePos
- BACKGROUND
- LEFT_CHARACTOR
- RIGHT_CHARACTOR
- MAIN_VIEW
- TEXT_BACKGROUND
