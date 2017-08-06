//
//  ViewController.swift
//  Memorable Places
//
//  Created by Juan Pablo Pinto Santana on 7/1/17.
//  Copyright © 2017 Juan Pablo Pinto Santana. All rights reserved.
//

import UIKit
import CoreLocation
import MapKit

enum MapError: Error {
    case ExtractError(String)
}

class MapViewController: UIViewController, CLLocationManagerDelegate {

    @IBOutlet var map: MKMapView!
    
    var manager = CLLocationManager()
    
    static let spanDelta: CLLocationDegrees = 0.05
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let uilpgr = UILongPressGestureRecognizer(target: self, action: #selector(MapViewController.longPress(gestureRecognizer:)))
        uilpgr.minimumPressDuration = 2
        map.addGestureRecognizer(uilpgr)
        if (activePlace != -1 && places.count > activePlace) {
            do {
                let title = try getActivePlaceName()
                let (latitude, longitude) = try getActivePlaceLatAndLng()
                let coordinate = CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
                let span: MKCoordinateSpan = MKCoordinateSpan(latitudeDelta: MapViewController.spanDelta, longitudeDelta: MapViewController.spanDelta)
                let region: MKCoordinateRegion = MKCoordinateRegion(center: coordinate, span: span)
                map.setRegion(region, animated: true)
                let annotation = MKPointAnnotation()
                annotation.title = title
                annotation.coordinate = coordinate
                map.addAnnotation(annotation)
            } catch {
                print("Could not make annotation")
            }
        } else {
            manager.delegate = self
            manager.desiredAccuracy = kCLLocationAccuracyBest
            manager.requestWhenInUseAuthorization()
            manager.startUpdatingLocation()
        }
    }
    
    

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let coordinate = CLLocationCoordinate2D(latitude: locations[0].coordinate.latitude, longitude: locations[0].coordinate.longitude)
        let span: MKCoordinateSpan = MKCoordinateSpan(latitudeDelta: MapViewController.spanDelta, longitudeDelta: MapViewController.spanDelta)
        let region: MKCoordinateRegion = MKCoordinateRegion(center: coordinate, span: span)
        map.setRegion(region, animated: true)
    }
    
    func getActivePlaceName() throws -> String {
        guard let name = places[activePlace]["name"] else {
            throw MapError.ExtractError("Could not extract name from activePlace")
        }
        return name
    }
    
    func getActivePlaceLatAndLng() throws -> (Double, Double) {
        guard let latitudeString = places[activePlace]["lat"], let latitude = Double(latitudeString) else {
            throw MapError.ExtractError("Could not extract latitude from activePlace")
        }
        guard let longitudeString = places[activePlace]["lng"], let longitude = Double(longitudeString) else {
            throw MapError.ExtractError("Could not extract longitude from activePlace")
        }
        return (latitude, longitude)
    }

    func longPress(gestureRecognizer: UIGestureRecognizer) {
        if (gestureRecognizer.state == .began) {
            let touchPoint = gestureRecognizer.location(in: self.map)
            let coordinate = map.convert(touchPoint, toCoordinateFrom: self.map)
            let location = CLLocation(latitude: coordinate.latitude, longitude: coordinate.longitude)
            let annotation = MKPointAnnotation()
            CLGeocoder().reverseGeocodeLocation(location) { (placemarks, error) in
                if let error = error {
                    print(error)
                } else if let placemark = placemarks?[0] {
                    let subThoroughfare = placemark.subThoroughfare ?? ""
                    let thoroughfare = placemark.thoroughfare ?? ""
                    var title = "\(subThoroughfare) \(thoroughfare)"
                    if title == "" {
                       title = "Added \(NSDate())"
                    }
                    annotation.title = title
                    annotation.coordinate = coordinate
                    self.map.addAnnotation(annotation)
                    places.append(["name": title, "lat": String(coordinate.latitude), "lng": String(coordinate.longitude)])
                    UserDefaults.standard.set(places, forKey: "places")
                }
            }
        }
    }
}
