//
//  ViewController.swift
//  Location Aware
//
//  Created by Juan Pablo Pinto Santana on 6/30/17.
//  Copyright © 2017 Juan Pablo Pinto Santana. All rights reserved.
//

import UIKit
import CoreLocation

class ViewController: UIViewController, CLLocationManagerDelegate {

    @IBOutlet var latitudeLabel: UILabel!
    @IBOutlet var longitudeLabel: UILabel!
    @IBOutlet var courseLabel: UILabel!
    @IBOutlet var speedLabel: UILabel!
    @IBOutlet var altitudeLabel: UILabel!
    @IBOutlet var adressLabel: UILabel!
    var manager = CLLocationManager()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        manager.delegate = self
        manager.desiredAccuracy = kCLLocationAccuracyBest
        manager.requestWhenInUseAuthorization()
        manager.startUpdatingLocation()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        let location = locations[0]
        latitudeLabel.text = String(location.coordinate.latitude)
        longitudeLabel.text = String(location.coordinate.longitude)
        courseLabel.text = String(location.course)
        speedLabel.text = String(location.speed)
        altitudeLabel.text = String(location.altitude)
        CLGeocoder().reverseGeocodeLocation(location) { (placemarks, error) in
            if let error = error {
                print(error)
            } else {
                if let placemark = placemarks?[0] {
                    let subThoroughfare = placemark.subThoroughfare ?? ""
                    let thoroughfare = placemark.thoroughfare ?? ""
                    let subLocality = placemark.subLocality ?? ""
                    let subAdministrativeArea = placemark.subAdministrativeArea ?? ""
                    let postalCode = placemark.postalCode ?? ""
                    let country = placemark.country ?? ""
                    self.adressLabel.text = "\(subThoroughfare) \(thoroughfare)\n\(subLocality)\n\(subAdministrativeArea)\n\(postalCode)\n\(country)"
                }
            }
        }
    }
}

