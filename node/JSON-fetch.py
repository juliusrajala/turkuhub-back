#-*- coding: utf-8 -*-
import requests
import json
import threading

def req_fetch():
    '''
    Receives the uri of the bus data, loads it and sends the bulk
    data to the other methods to handle.
    '''
    url = "http://data.foli.fi/siri/vm"
    threading.Timer(2, req_fetch).start()
    response = requests.get(url=url)
    data = json.loads(response.text)
    #check_for_vehicles(data)
    parse_data(data)

def parse_data(data):
    '''
    This method is supposed to move the data into a desired format.

    We basically want this to open the data it receives and go through
    it for the desired parameters after checking if a bus is being monitored.
    '''
    print "Handling JSON . . ."
    bus_list = []
    bus_count = 0
    if data['status'] != 'OK':
        print "Service not currently active"
    else:
        try:
            print "Service status is OK."
            vehicles = data['result']['vehicles']
            for bus_id, bus_data in vehicles.iteritems():
                vehicle = {}
                if bus_data['monitored']:
                    vehicle['bus_id'] = bus_id
                    vehicle['direction'] = bus_data['directionref']
                    vehicle['line'] = bus_data['publishedlinename']
                    vehicle['latitude'] = bus_data['latitude']
                    vehicle['longitude'] = bus_data['longitude']
                    try:
                        vehicle['nextstop'] = bus_data['next_stoppointname']
                    except KeyError:
                        vehicle['nextstop'] = "No_stop_data"
                    bus_list.append(vehicle)
                    print 'Bus added to the list.'
                else:
                    print 'Bus not monitored.'
        except KeyError:
            print "Error thrown."
        craft_bus_data(bus_list)
            

def craft_bus_data(vehicles):
    '''
    Method is supposed to take list of JSON dictionaries, dump them into
    a JSON file.
    '''
    with open('JSON/parsittudata.json', 'w') as f:
        json.dump(vehicles, f, indent=4)

# This method scribbles the vehicle data into a command line
# friendly form for testing, it also displays the correct route
# to parse json-data in this file-form.
def check_for_vehicles(data):
    vehicles = data['result']['vehicles']
    for key,value in vehicles.iteritems():
        print "id: " + key
        if value['monitored']:
            print "Linja: " + value['publishedlinename']
            print value['longitude'], value['latitude']
            print "Seuraava pysäkki: ".decode('utf8') + value['next_stoppointname']+'\r\n'
        else:
            print "Not monitored.\r\n"
    #vehicles = data[0]['results']['vehicles']
    #try:
#       print vehicles  
#   except:
#       print "Something went wrong."

def main():
    #Loop here to run fetch every 5 seconds
    count = 0
    remote_server_time = 0
    req_fetch()


if __name__ == '__main__':
    main()