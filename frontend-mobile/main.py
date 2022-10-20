from cProfile import label
from cgitb import text
from email.mime import image
import imp
import kivy
kivy.require('2.1.0') # replace with your current kivy version !

from time import sleep

from kivy.app import App
from kivy.uix.label import Label
from kivy.uix.image import Image
from kivy.uix.gridlayout import GridLayout
from kivy.uix.button import Button

from app import Take_query


class MyGrid(GridLayout):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.image = "Emmanuel Arhin"
        self.text = "okay let go"
        self.rows = 1
        btn1 = Button(text='Hello world 1')
        btn1.bind(on_press=self.say)
        self.add_widget(btn1)

        # self.add_widget(Label(text=self.image))
   


  
    def say(self,instance):
        Take_query()
        print("say something")

class MyApp(App):

    def build(self):
        return MyGrid()
        # sleep(20)
        # return myGrid.changeText("works","works")




if __name__ == '__main__':
    MyApp().run()