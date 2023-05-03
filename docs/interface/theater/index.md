# Interface of Theater

webページに埋め込むデータの構造

## Timeline
|name|type|required|
|--|--|--|
|points|List\<Point\>|y|

## Point

|name|type|required|
|--|--|--|
|length|int|y|
|images|List\<Image\>|y|
|text|string|y|

## Image
|name|type|required|
|--|--|--|
|image_url|string|y|
|image_pos|ImagePos|y|

## ImagePos
- BACKGROUND
- LEFT_CHARACTOR
- RIGHT_CHARACTOR
- MAIN_VIEW
- TEXT_BACKGROUND