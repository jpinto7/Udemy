import folium
import pandas as pd

def color_producer(elevation):
  if elevation < 1000:
    return 'green'
  elif 1000 <= elevation < 3000:
    return 'orange'
  else:
    return 'red'

data = pd.read_csv('Volcanoes.txt')
data_list = zip(list(data['LAT']), list(data['LON']), list(data['ELEV']))

map = folium.Map(location=[38.58, -99.09], tiles='OpenStreetMap')
fgv = folium.FeatureGroup(name='Volcanoes')

for lt, ln, el in data_list:
  # fg.add_child(folium.Marker(location=[lt, ln], popup=folium.Popup(str(el) + ' m', parse_html=True, max_width=50), icon=folium.Icon(color=color_producer(el))))
  fgv.add_child(folium.CircleMarker(location=[lt, ln], radius=6, popup=folium.Popup(str(el) + ' m', parse_html=True, max_width=50), fill_color=color_producer(el), color='grey', fill_opacity=0.7))

fgp = folium.FeatureGroup(name='Population')

fgp.add_child(folium.GeoJson(data=open('world.json', 'r', encoding='utf-8-sig').read(), style_function=lambda x: {'fillColor':'green' if x['properties']['POP2005'] < 10000000 else 'orange' if 10000000 <= x['properties']['POP2005'] < 20000000 else 'red' }))

map.add_child(fgv)
map.add_child(fgp)

map.add_child(folium.LayerControl())

map.save('Map1.html')
