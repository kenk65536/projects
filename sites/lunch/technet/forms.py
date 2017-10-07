from django import forms
class nameForm(forms.Form):
  name1 = forms.CharField(max_length=200)
